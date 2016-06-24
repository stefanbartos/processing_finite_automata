package fi.muni.cz.pb138;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * Created by laky on 24.6.16.
 */

@WebServlet(name = "Controller", urlPatterns = {"/dfa/*"})
public class Controller extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getPathInfo();
        switch(action) {
            case "/list":
                listFiles(request, response);
                break;
            case "/index":
                request.getRequestDispatcher("/WEB-INF/jsp/index.html").forward(request, response);
                break;
        }
    }

    private void listFiles(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        StringBuilder temp = new StringBuilder();
        File file = new File("data");
        File[] listOfFiles = file.listFiles();
        for (int i = 0; i < listOfFiles.length; ++i) {
            if (listOfFiles[i].isFile()) {
                temp.append(";" + listOfFiles[i].getName());
            }
        }
        String names = temp.toString();
        request.setAttribute("names", names);
        request.getRequestDispatcher("/WEB-INF/jsp/list.jsp").forward(request, response);
    }
}

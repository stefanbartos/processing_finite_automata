package cz.muni.fi.pb138;

/**
 * Created by laky on 24.6.16.
 */



import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;

@WebServlet(urlPatterns = {"/index/*"})
public class Controller extends HttpServlet {

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String action = request.getPathInfo();
        switch(action) {
            case "/delete":
                removeFiles(request,response);
                break;
            default:
                response.sendError(HttpServletResponse.SC_NOT_FOUND,
                        "Unknown action: " + action);
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String action = request.getPathInfo();
        switch(action) {
            case "/list":
                listFiles(request,response);
                break;
            case "/selectAutomata" :
                selectAutomata(request,response);
                break;
            default:
                response.sendError(HttpServletResponse.SC_NOT_FOUND,
                        "Unknown action: " + action);
        }


    }

    private void listFiles(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        StringBuilder temp = new StringBuilder();
        File file = null;
        try {
            file = new File(getClass().getResource("data").toURI());
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        String msg = file.getAbsolutePath();

        if (file.isDirectory()) {
            File[] listOfFiles = file.listFiles();
            for (int i = 0; i < listOfFiles.length; ++i) {
                if (listOfFiles[i].isFile()) {
                    if (i - 1 == listOfFiles.length) {
                        temp.append(listOfFiles[i].getName());
                    } else {
                        temp.append(listOfFiles[i].getName() + ";");
                    }
                }
            }
        }
        String names = temp.toString();

        response.setContentType("text/xml");
        response.setHeader("Cache-Control", "no-cache");

        PrintWriter out = response.getWriter();

        out.write("<names>" + names + "</names>");
        out.flush();
    }

    private void removeFiles(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String str = request.getParameter("automataToDelete");
        File file = null;
        try {
            file = new File(getClass().getResource("data").toURI());
        } catch (URISyntaxException e) {
            PrintWriter out = response.getWriter();

            out.write("<errorMessage> Could not open file </errorMessage>");
            out.flush();
        }
        if (file.isDirectory()) {
            File[] listOfFiles = file.listFiles();
            for (int i = 0; i < listOfFiles.length; ++i) {
                if (listOfFiles[i].isFile() && listOfFiles[i].getName().equals(str)) {
                    listOfFiles[i].delete();
                    }
                }
            }
        String msg = file.getAbsolutePath();
    }

    private void selectAutomata(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String str = request.getParameter("automataToSelect");
        File file = null;
        StringBuilder sb = new StringBuilder();

        try {
            file = new File(getClass().getResource("data").toURI());
        } catch (URISyntaxException e) {
        }

        if (file.isDirectory()) {
            File[] listOfFiles = file.listFiles();
            for (int i = 0; i < listOfFiles.length; ++i) {
                if (listOfFiles[i].isFile() && listOfFiles[i].getName().equals(str)) {
                    try(BufferedReader br = new BufferedReader(new FileReader(listOfFiles[i]))) {
                        String line = br.readLine();

                        while (line != null) {
                            sb.append(line);
                            sb.append(System.lineSeparator());
                            line = br.readLine();
                        }
                    }
                }
            }
        }
        String everything = sb.toString();

        response.setContentType("text/xml");
        response.setHeader("Cache-Control", "no-cache");

        PrintWriter out = response.getWriter();

        out.write(everything);
        out.flush();
    }

}
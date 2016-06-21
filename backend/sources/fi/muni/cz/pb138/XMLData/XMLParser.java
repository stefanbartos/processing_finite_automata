package fi.muni.cz.pb138.XMLData;

import fi.muni.cz.pb138.Automata.Automata;

import java.net.URI;

/**
 * Created by laky on 21.6.16.
 */
public class XMLParser {

    /**
     * Gets URI as paramater (File object?) and returns created automata over the XML file
     * @param uri expected file with automata
     * @return
     * @throws IllegalArgumentException Something went wrong, probably wrong URI or XML file not
     * matching the scheme. More in object itself
     */
    public Automata getAutomatFromFile(URI uri) throws IllegalArgumentException {
        throw new IllegalArgumentException("Some funky stuff");
    }
}

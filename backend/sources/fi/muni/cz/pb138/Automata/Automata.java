package fi.muni.cz.pb138.Automata;

import java.util.Collections;
import java.util.Set;

/**
 * Representation of Finite State Automata
 * Created by laky on 21.6.16.
 */
public class Automata {
    //All of possible States
    private Set<State> states;
    //Initial states, maybe will include into State object and retrieve from it, will see
    private Set<State> startState;
    //All active states in one moment od calculation
    private Set<State> activeStates;

    /**
     * creates automata, probably will change to protected as there should be no need of it at fronted, XMLParser will
     * return it from file.
     */
    public Automata() {

    }

    /**
     * U need to draw it right?
     */

    public Set<State> getActiveStates() {
        return Collections.unmodifiableSet(activeStates);
    }


    public Set<State> getStartState() {
        return Collections.unmodifiableSet(startState);
    }


    public Set<State> getStates() {
        return Collections.unmodifiableSet(states);
    }


    /**
     * Simply calculated over chosen word
     * @param word Word to calculate over
     * @return true is automata accepts it, false otherwise
     */
    public boolean isInAlphabet(String word) {
        return false;
    }


    /**
     * As automata stores internally current states, before every new calculation there is need to reset them to initial
     * states. NEEDED TO CALL BEFORE EVERY CALCULATION
     * @return this automata, so it can be connected by dot notation with another calls.
     */
    public Automata initAutomata() {
        return this;
    }

    /**
     * Calculates next step of automata over given character. Current state of automata is stored internally, so theres
     * no need to remember or pass it from front end
     * @param c Maybe should change it to Character class, so it wont be messy
     * @return All active States after calculation
     */
    public Set<State> getNextStep(String c) {
        return null;
    }


}

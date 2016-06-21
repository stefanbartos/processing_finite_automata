package fi.muni.cz.pb138.Automata;

import java.util.Set;

/**
 * Created by laky on 21.6.16.
 */
public class State {
    //UNIQUE PRIMARY KEY!!
    private String name;
    //Set of all Rules for given State
    private Set<Rule> rules;

    //some Flags
    boolean isInitial;
    boolean isAcceptable;

    /**
     * U need to draw it right?
     */
    public String getName() {
        return name;
    }

    public Set<Rule> getRules() {
        return rules;
    }

    public boolean isInitial() {
        return isInitial;
    }

    public boolean isAcceptable() {
        return isAcceptable;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof State)) return false;

        State state = (State) o;

        return name.equals(state.name);

    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}

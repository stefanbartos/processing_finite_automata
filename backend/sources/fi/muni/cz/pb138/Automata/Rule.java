package fi.muni.cz.pb138.Automata;

/**
 * Class to represent one rule
 * Created by laky on 21.6.16.
 */
public class Rule {
    //From where we move
    private String startState;
    //Over which character we move
    private String character;
    //Where we move
    private String destination;


    /**
     * U need to draw it right?
     */
    public String getStartState() {
        return startState;
    }

    public String getCharacter() {
        return character;
    }

    public String getDestination() {
        return destination;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Rule)) return false;

        Rule rule = (Rule) o;

        if (!startState.equals(rule.startState)) return false;
        if (!character.equals(rule.character)) return false;
        return destination.equals(rule.destination);

    }

    @Override
    public int hashCode() {
        int result = startState.hashCode();
        result = 31 * result + character.hashCode();
        result = 31 * result + destination.hashCode();
        return result;
    }
}

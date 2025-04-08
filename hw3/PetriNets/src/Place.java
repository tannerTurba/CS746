import java.util.*;

public class Place {
    private String id;
    private int tokens = 0;
    ArrayList<Transition> transitions = new ArrayList<>();

    public Place(String[] inputs) {
        this.id = inputs[0];
        this.tokens = Integer.parseInt(inputs[1].trim());
    }

    /**
     * @return int return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @return int return the tokens
     */
    public int getTokens() {
        return tokens;
    }

    /**
     * @param tokens the tokens to set
     */
    public void addTokens(int tokens) {
        this.tokens += tokens;
    }

    public void removeTokens(int tokens) {
        this.tokens -= tokens;
    }

}

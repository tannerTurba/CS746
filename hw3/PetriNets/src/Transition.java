import java.util.*;

public class Transition {
    private String id;
    private Map<Place, Integer> inputs;
    private Map<Place, Integer> outputs;

    public Transition(String id, Map<Place, Integer> inputs, Map<Place, Integer> outputs) {
        this.id = id;
        this.inputs = new HashMap<>(inputs);
        this.outputs = new HashMap<>(outputs);
    }

    /**
     * @return String return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @return Map of inputs
     */
    public Map<Place, Integer> getInputs() {
        return this.inputs;
    }

    /**
     * @return True if ready to fire
     */
    public boolean readyToFire() {
        for (Map.Entry<Place, Integer> entry : this.inputs.entrySet()) {
            if (entry.getKey().getTokens() < entry.getValue()) {
                // Not enough tokens to satisfy weight - fire fails.
                return false;
            }
        }
        return true;
    }

    /**
     * Fires the transition
     */
    public void fire() {
        if (readyToFire()) {
            // System.out.printf("Transition %s fired\n", this.id);
            for (Map.Entry<Place, Integer> entry : this.inputs.entrySet()) {
                // Remove weighted amount of tokens from input
                entry.getKey().removeTokens(entry.getValue());
            }
            for (Map.Entry<Place, Integer> entry : this.outputs.entrySet()) {
                // Add weighted amount of tokens from input
                entry.getKey().addTokens(entry.getValue());
            }
        }
    }

    /**
     * Returns the string representation of a Transition.
     */
    public String toString() {
        return this.id;
    }
}

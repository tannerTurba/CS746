import java.io.*;
import java.util.*;

public class PetriNet {
    private String fileName = "";
    private Map<String, Place> places = new HashMap<>();
    private ArrayList<Transition> transitions = new ArrayList<>();
    private Scanner scanner = new Scanner(System.in);

    public PetriNet(String[] args) {
        for (int i = 0; i < args.length; i++) {
            switch (args[i]) {
                case "-f":
                    fileName = args[++i];
                    break;

                default:
                    break;
            }
        }

        if (!fileName.equals("")) {
            readFile();
            printIds();
            ArrayList<Transition> ts = getReadyToExecute();
            while (!ts.isEmpty()) {
                System.out.printf("Firing transitions: %s\n", Arrays.toString(ts.toArray()));
                for (Transition t : ts) {
                    t.fire();
                }
                System.out.println(this);
                ts = getReadyToExecute();
            }
        }
        scanner.close();
    }

    /**
     * Reads data from the file specified by the user's input parameters.
     */
    public void readFile() {
        // Load full data set from file
        try {
            Scanner scanner = new Scanner(new File(fileName));
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine().trim();
                if (line.length() > 0 && line.charAt(0) != '#') {
                    // Not a comment or empty line, so continue

                    String[] data = line.split(", ");
                    if (data.length == 2) {
                        // Format for a Place
                        Place newPlace = new Place(data);
                        places.put(newPlace.getId(), newPlace);
                    }
                    else if (data.length == 3) { 
                        // Format for a Transition 
                        String id = data[0];
                        Map<Place, Integer> inputs = readMap(data[1].split(" "));
                        Map<Place, Integer> outputs = readMap(data[2].split(" "));

                        Transition transition = new Transition(id, inputs, outputs);
                        transitions.add(transition);
                        for (Map.Entry<Place, Integer> entry : inputs.entrySet()) {
                            entry.getKey().transitions.add(transition);
                        }
                    }
                }
            }
            scanner.close();
        } 
        catch (FileNotFoundException e) {
            System.err.println("No such file or directory: " + fileName);
        }
    }

    /**
     * Parses a "map" from the file input file to determine the weights
     * for each Place that connects to the Transition. 
     * @param data
     * @return
     */
    private Map<Place, Integer> readMap(String[] data) {
        Map<Place, Integer> result = new HashMap<>();
        for (String iPlace : data) {
            String[] place = iPlace.split("=");

            // Finde the place with the corresponding ID
            Place p = places.get(place[0]);
            int weight = 1;
            
            // Read the weight, if specified
            if (place.length == 2) {
                weight = Integer.parseInt(place[1]);
            }
            
            // Add to the resulting Map
            result.put(p, weight);
        }
        return result;
    }

    public ArrayList<Transition> getReadyToExecute() {
        ArrayList<Transition> result = new ArrayList<>();
        ArrayList<Transition> blacklist = new ArrayList<>();
        for (Transition t : transitions) {
            if (t.readyToFire()) {
                Map<Place, Integer> inputs = t.getInputs();
                ArrayList<Transition> ts = new ArrayList<>();
                ts.add(t);
                for (Map.Entry<Place, Integer> i : inputs.entrySet()) {
                    for (Transition t2 : i.getKey().transitions) {
                        if (!t2.equals(t) && !ts.contains(t2) && t2.readyToFire() && !blacklist.contains(t2)) {
                            // The current transition shares a resource that could fire now.
                            ts.add(t2);
                        }
                    }
                }
    
                for (Transition set : blacklist) {
                    ts.remove(set);
                }
                if (ts.size() > 1) {
                    blacklist.addAll(ts);

                    // Manual decision
                    System.out.printf("Choose a transition to fire: %s\n", Arrays.toString(ts.toArray()));
                    String input = scanner.next();
    
                    for (Transition transition : ts) {
                        if (transition.getId().equals(input)) {
                            // Fire the specified transition
                            result.add(transition);
                        }
                    }
                }
                else if(!blacklist.contains(t)) {
                    // No other transitions can fire, so just fire the current one. 
                    result.add(t);
                }
            }
        }
        return result;
    }

    /**
     * Get the token count of each place of the petri net
     */
    public String toString() {
        StringBuilder sb = new StringBuilder("<");
        for (Map.Entry<String, Place> entry : places.entrySet()) {
            sb.append(entry.getValue().getTokens());
            sb.append(',');
        }
        sb.append('>');
        return sb.toString();
    }

    /**
     * Prints the IDs of the PetriNet
     */
    private void printIds() {
        StringBuilder sb = new StringBuilder("<");
        ArrayList<String> ids = new ArrayList<>(places.keySet());
        for (int i = 0; i < ids.size(); i++) {
            sb.append(ids.get(i));
            if (i < ids.size() - 1) {
                sb.append(",");
            }
        }
        sb.append('>');
        System.out.printf("Petri Net Markings: %s\n\n", sb.toString());
    }

    public static void main(String[] args) {
        if (args.length <= 0) {
            return;
        }
        new PetriNet(args);
    }
}

This is a Petri Net simulator, which executes Petri Nets until deadlock is acheived or there aren't any
transitions left to fire. 

A .txt file can be used to specify the structure of a Petri Net. The Places of a the Petri Net must be 
specified in a single line by its ID and the initial token count, which is delimited with a comma and 
a space. Transitions must be specified by in a line with its ID, a set of input Places, followed by 
a set of output places. These three properties are delimited with a comman and a space. The sets of 
intput/output places are delimited with single space. The weight between the Transition and each Place
can be optionaly specified with an equals sign, immediately followed by an integer. Comments can be 
used in the file by starting a line with a pound-sign. 

The following is an example of a PetriNet for the baking cookies example that was shown in class:
# Places
P1, 0
P2, 1
P3, 0
P4, 1
P5, 0
P6, 0
P7, 1

# Transitions
T1, P1=1, P2
T2, P2, P1=1 P3=1
T3, P3 P4, P5
T4, P5, P4
T5, P3 P7, P6
T6, P6, P7

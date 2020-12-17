--- 
published: false
title: "Lectures on Quantum Information Science"
author: "Artur Ekert, ed. Tim Hosgood"
date: "Last updated: December 17, 2020"
description: "The online book version of an introductory series of lectures on quantum computing."
output:
  bookdown::tufte_html_book:
    toc: yes
    toc_depth: 1
    css: ["tufte-custom.css", "global.css"]
    split_by: chapter
  bookdown::gitbook:
    css: ["gitbook-custom.css", "global.css"]
    split_by: section
    config:
      toc:
        before: |
          <li><a href="https://thosgood.com/quantum-info/">Quantum Information Science</a></li>
        collapse: section
      view: https://github.com/thosgood/quantum-info/blob/master/%s
      download: ["pdf"]
      sharing:
        facebook: no
        github: no
        twitter: no
        linkedin: no
        weibo: no
        instapaper: no
        vk: no
        all: []
      info: no
  bookdown::pdf_book:
    template: latex-template.tex
    latex_engine: xelatex
    citation_package: natbib
    keep_tex: yes
---

\providecommand{\xmapsto}[1]{\overset{#1}{\longmapsto}}
\providecommand{\bra}[1]{\langle#1|}
\providecommand{\ket}[1]{|#1\rangle}
\providecommand{\braket}[1]{\langle#1\rangle}
\providecommand{\proj}[1]{|#1\rangle\langle#1|}
\providecommand{\av}[1]{\braket{#1}}
\providecommand{\tr}{\operatorname{tr}}
\providecommand{\id}{\operatorname{id}}
\providecommand{\diag}[2]{\begin{bmatrix}#1&0\\0&#2\end{bmatrix}}




# Introduction {-}

In this series of lectures you will learn how inherently quantum phenomena, such as quantum interference and quantum entanglement, can make information processing more efficient and more secure, even in the presence of noise.

The interdisciplinary nature of this topic, combined with the diverse backgrounds that different readers have, means that some may find some particular chapters easy, while others find them difficult.
The following will be assumed as prerequisites: elementary probability theory, complex numbers, vectors and matrices, tensor products, and Dirac bra-ket notation.
A basic knowledge of quantum mechanics (especially in the simple context of finite dimensional state spaces, e.g. state vectors, composite systems, unitary matrices, Born rule for quantum measurements) and some ideas from classical theoretical computer science (complexity theory) would be helpful, but is not at all essential.


## Topics {-}

- Fundamentals of quantum theory
  + addition of probability amplitudes
  + quantum interference
  + mathematical description of states and evolution of closed quantum systems (Hilbert space, unitary evolution)
  + measurements (projectors, Born rule)
  + Pauli matrices
- Distinguishability of quantum states
- The Bloch sphere
  + parametrisation
  + action of quantum gates on the Bloch vector
- The definition of quantum entanglement (tensor product structure)
- The no-cloning theorem and quantum teleportation
- Quantum gates
  + phase gate
  + Hadamard
  + controlled-not
  + SWAP
  + the Hadamard-phase-Hadamard network
  + phase “kick-back” induced by controlled-U
  + phase “kick-back” induced by quantum Boolean function evaluation
- Quantum algorithms
  + Deutsch
  + Bernstein-Vazirani
  + Simon
- Bell's theorem
  + Quantum correlations
  + CHSH inequality
  + density matrices
  + partial trace
  + statistical mixture of pure states,
- Born rule for density matrices
- Quantum entanglement in terms of density matrices
- Completely positive maps
  + Kraus operators
  + the Choi matrix
  + positive versus completely positive maps
  + partial-transpose
- The simple model of decoherence
- Quantum error correction of bit-flip and phase-flip errors

<!--chapter:end:index.Rmd-->

# (PART) Part I {-} 

# Quantum interference, and things to come

:::: {.comment data-latex=""}
::: {.book-only}
[Click here to view this entire chapter on one page.](../tufte/quantum-interference-and-things-to-come.html#quantum-interference-and-things-to-come)
:::

::: {.tufte-only}
[Click here to view this chapter in the book.](../book/quantum-interference-and-things-to-come.html#quantum-interference-and-things-to-come)
:::
::::

> About complex numbers, called probability amplitudes, that, unlike probabilities, can cancel each other out, leading to quantum interference and qualitatively new ways of processing information.

The classical theory of computation does not usually refer to physics.
Pioneers such as Alan Turing, Alonzo Church, Emil Post, and Kurt Gödel managed to capture the correct classical theory by intuition alone and, as a result, it is often falsely assumed that its foundations are self-evident and purely abstract.
They are not!^[Computation is a physical process. Computation is a physical process. Computation is ...]

The concepts of information and computation can be properly formulated only in the context of a physical theory --- information is stored, transmitted and processed always by _physical_ means.
Computers are physical objects and computation is a physical process.
Indeed, any computation, classical or quantum, can be viewed in terms of physical experiments, which produce **outputs** that depend on initial preparations called **inputs**.
Once we abandon the classical view of computation as a purely logical notion independent of the laws of physics it becomes clear that whenever we improve our knowledge about physical reality, we may also gain new means of computation.
Thus, from this perspective, it is not very surprising that the discovery of quantum mechanics in particular has changed our understanding of the nature of computation.
In order to explain what makes quantum computers so different from their classical counterparts, we begin with the rudiments of quantum theory.

Some of what we say in this chapter will be repeated in later chapters, but usually in much more detail.
Feel free to think of this chapter as a sort of "aeroplane tour" of the rudiments, knowing that we will soon land on the ground to go out exploring by foot.





## Two basic rules

Quantum theory, at least at some instrumental level, can be viewed as a modification of probability theory.
We replace positive numbers (probabilities) with complex numbers $z$ (called **probability amplitudes**) such that the squares of their absolute values, $|z|^2$, are interpreted as probabilities.

::: {.idea data-latex=""}
  The correspondence between probability amplitude $z$ and probability $p=|z|^2$ is known as **Born's Rule**.
:::

The rules for combining amplitudes are very reminiscent of the rules for combining probabilities:

1. Whenever something can happen in a sequence of independent steps, we multiply the amplitudes of each step.


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-2-1} \end{center}

2. Whenever something can happen in several alternative ways, we add the amplitudes for each separate way.


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-3-1} \end{center}

That's it!
These two rules are basically all you need to manipulate amplitudes in any physical process, no matter how complicated.^[We will, however, amend the two rules later on when we touch upon particle statistics.]
They are universal and apply to any physical system, from elementary particles through atoms and molecules to white dwarfs stars.
They also apply to information, since, as we have already emphasised, information is physical.
The two rules look deceptively simple but, as you will see in a moment, their consequences are anything but trivial.





## Quantum interference: the failure of probability theory

Modern mathematical probability theory is based on three axioms, proposed by Andrey Nikolaevich Kolmogorov (1903--1987) in his monograph with the impressive German title _Grundbegriffe der Wahrscheinlichkeitsrechnung_ ("Foundations of Probability Theory").
The **Kolmogorov axioms** are simple and intuitive:^[I always found it an interesting coincidence that the two basic ingredients of modern quantum theory, namely probability and complex numbers, were discovered by the same person, an extraordinary man of many talents: a gambling scholar by the name of Girolamo Cardano (1501--1576).]

1. Once you identify all elementary outcomes, or events, you may then assign probabilities to them.
2. Probability is a number between $0$ and $1$, and an event which is certain has probability $1$.
3. Last but not least, the probability of any event can be calculated using a deceptively simple rule --- the **additivity axiom**:
  _Whenever an event can occur in several mutually exclusive ways, the probability for the event is the sum of the probabilities for each way considered separately._

Obvious, isn't it?
So obvious, in fact, that probability theory was accepted as a mathematical framework theory, a language that can be used to describe actual physical phenomena.
Physics should be able to identify elementary events and assign numerical probabilities to them.
Once this is done we may revert to mathematical formalism of probability theory.
The Kolmogorov axioms will take care of the mathematical consistency and will guide us whenever there is a need to calculate probabilities of more complex events.
This is a very sensible approach, apart from the fact that it does not always work!
Today, we know that probability theory, as ubiquitous as it is, fails to describe many common quantum phenomena.
In order to see the need for quantum theory let us consider a simple experiment in which probability theory fails to give the right predictions.





### The double slit experiment

In a double slit experiment, a particle emitted from a source $S$ can reach the detector $D$ by taking two different paths, e.g. through an upper or a lower slit in a barrier between the source and the detector.
After sufficiently many repetitions of this experiment we can evaluate the frequency of clicks in the detector $D$ and show that it is inconsistent with the predictions based on probability theory.
Let us use the quantum approach to show how the discrepancy arises.

The particle emitted from a source $S$ can reach detector $D$ by taking two different paths, with amplitudes $z_1$ and $z_2$ respectively.
We may say that the upper slit is taken with probability $p_1=|z_1|^2$ and the lower slit with probability $p_2=|z_2|^2$.
These are two mutually exclusive events.
With the two slits open, probability theory declares (by the additivity axiom) that the particle should reach the detector with probability $p_1+p_2= |z_1|^2+|z_2|^2$.
But this is not what happens experimentally!

Following the "quantum rules", first we add the amplitudes and then we square the absolute value of the sum to get the probability.
Thus, the particle will reach the detector with probability
\begin{equation}
\begin{aligned}
  p &= |z|^2
\\& = |z_1 + z_2|^2
\\& = |z_1|^2 + |z_2|^2
      + z_1^\star z_2 + z_1 z_2^\star
\\& = p_1 + p_2
      + |z_1||z_2|\left(
        e^{i(\varphi_2-\varphi_1)}
        + e^{-i(\varphi_2-\varphi_1)}
      \right)
\\& = p_1 + p_2
      + 2 \sqrt{p_1 p_2} \cos(\varphi_2-\varphi_1)
\\& = p_1 + p_2 + \mbox{interference terms}
\end{aligned}
(\#eq:interference)
\end{equation}
where we have expressed the amplitudes in their polar forms
$$
\begin{aligned}
  z_1 &= |z_1|e^{i\varphi_1}
\\z_2 &= |z_2|e^{i\varphi_2}.
\end{aligned}
$$
The appearance of the interference terms marks the departure from the classical theory of probability.
The probability of any two seemingly mutually exclusive events is the sum of the probabilities of the individual events, $p_1 + p_2$, _modified_ by the **interference term** $2 \sqrt{p_1p_2}\cos(\varphi_2-\varphi_1)$.
Depending on the **relative phase** $\varphi_2-\varphi_1$, the interference term can be either negative (which we call **destructive** interference) or positive (**constructive** interference), leading to either suppression or enhancement of the total probability $p$.

The algebra is simple; our focus is on the physical interpretation.
Firstly, note that the important quantity here is the _relative_ phase $\varphi_2-\varphi_1$ rather than the individual values $\varphi_1$ and $\varphi_2$.
This observation is not trivial at all.
If a particle reacts only to the difference of the two phases, each pertaining to a separate path, then it must have, somehow, experienced the two paths, right?
Thus we cannot say that the particle has travelled either through the upper or the lower slit, because it has travelled through _both_.
In the same way, quantum computers follow, in some tangible way, all computational paths simultaneously, producing answers that depend on all these alternative calculations.
Weird, but this is how it is!
Secondly, what has happened to the additivity axiom in probability theory --- what is wrong with it?
One thing that is wrong is the assumption that the processes of taking the upper or the lower slit are mutually exclusive.
In reality, as we have just mentioned, the two transitions _both occur_, simultaneously.
However, we cannot learn this from probability theory, or any other a priori mathematical construct.
There is no fundamental reason why Nature should conform to the additivity axiom.
^[According to the philosopher Karl Popper (1902--1994) a theory is genuinely scientific only if it is possible, in principle, to establish that it is false. Genuinely scientific theories are never finally confirmed because no matter how many confirming observations have been made observations that are inconsistent with the empirical predictions of the theory are always possible.]
We find out how nature works by making intelligent guesses, running experiments, checking what happens and formulating physical theories.
If our guess disagrees with experiments then it is wrong, so we try another intelligent guess, and another, etc.
Right now, quantum theory is the best guess we have: it offers good explanations and predictions that have not been falsified by any of the existing experiments.
This said, be assured that one day quantum theory will be falsified and we will have to start guessing again.






## Superpositions

Amplitudes are more than just tools for calculating probabilities: they tell us something about physical reality.
When we deal with probabilities, we may think about them as numbers that quantify our lack of knowledge.
Indeed, when we say that a particle goes through the upper or the lower slit with some respective probabilities it does go through one of the two slits, we just do not know which one.
In contrast, according to quantum theory, a particle that goes through the upper and the lower slit with certain amplitudes does explore both of the two paths, not just one of them.
This is a statement about a real physical situation, about something that is out there and something we can experiment with.
The assumption that the particle goes through one of the two slits, but we do not know which one, is inconsistent with the experimental observations.
We have to accept that apart from some easy to visualise states, also known as the basis states, such as the particle at the upper slit or the particle at the lower slit, there are infinitely many other states, all of them equally real, in which the particle is in a _superposition_ of the two basis states.
This rather bizarre picture of reality is the best we have at the moment, and it works, at least for now.  Physicists write such states as
^[Dirac notation will likely be familiar to physicists, but may look odd to mathematicians or computer scientists. Love it or hate it (and I suggest the former), the notation is so common that you simply have no choice but to learn it, especially if you want to study anything related to quantum theory.]
$$
\ket{\psi}=\alpha \ket{\text{at the upper slit}} +\beta \ket{\text{at the lower slit}},
$$
meaning the particle at the upper slit with amplitude $\alpha$ and at the lower slit with amplitude $\beta$.  Mathematically, you can think about this expression as a vector $\ket{\psi}$ in a two-dimensional complex vector space written in terms of the two basis vectors $\ket{\text{at the upper slit}}$ and $\ket{\text{at the lower slit}}$. You can also write this vector as a column vector with two complex entries $\alpha$ and $\beta$, but then you have to explain the physical meaning of the basis states. Here, we use the $\ket{\cdot}$ notation, introduced by Paul Dirac in the early days of the quantum theory as a useful way to write and manipulate vectors. In Dirac notation you can put into the box $\ket{\phantom{0}}$ anything that serves to specify what the vector is. It could be $\ket{\uparrow}$ for spin up and $\ket{\downarrow}$ for spin down, or $\ket{0}$ for a quantum bit holding logical $0$ and $\ket{1}$ for a quantum bit holding logical $1$, etc. As we shall see soon, there is much more to this notation.





## Interferometers

Many modern interference experiments are performed using internal degrees of freedom of atoms and ions. For example, **Ramsey interferometry**, named after American physicist Norman Ramsey, is a generic name for an interference experiment in which atoms are sent through two separate resonant interaction zones, known as **Ramsey zones**, separated by an intermediate dispersive interaction zone.

Many beautiful experiments of this type were carried out in the 1990s in Serge Haroche's lab at the Ecole Normale Supérieure in Paris. Rubidium atoms were sent through two separate interaction zones (resonant interaction in the first and the third cavity) separated by a phase inducing dispersive interaction zone (the central  cavity). The atoms were subsequently measured, via a selective ionisation, and found to be in one of the two preselected energy states, here labeled as $|0\rangle$ and $|1\rangle$. The fraction of atoms found in states $|0\rangle$ or $|1\rangle$ showed a clear dependence on the phase shifts induced by the dispersive interaction in the central cavity. In 2012 Serge Haroche and Dave Wineland shared the Nobel Prize in physics for "ground-breaking experimental methods that enable measuring and manipulation of individual quantum systems."

(ref:ramsey-figure-caption) A schematic diagram of a Ramsey interference experiment.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/ramsey-figure-1} 

}

\caption{(ref:ramsey-figure-caption)}(\#fig:ramsey-figure)
\end{figure}

The three rectangular boxes in Figure \@ref(fig:ramsey-figure) represent three cavities, each cavity being an arrangement of mirrors which traps electromagnetic field (think about standing waves in between two mirrors).
The oval shapes represent rubidium atoms with two preselected energy states labelled as $\ket{0}$ and $\ket{1}$.
Each atom is initially prepared in a highly excited internal energy state $\ket{0}$ and zips through the three cavities, from the left to the right.
In each cavity the atom interacts with the cavity field.
The first and the third cavities are, for all theoretical purposes, identical.
Their frequencies are tuned to the resonant frequency of the atom, and the atom exchanges energy with the cavity, going back and forth between its energy states $\ket{0}$ and $\ket{1}$.
In contrast, in the second (central) cavity, the atom undergoes the so-called dispersive interaction: it is too off resonance to exchange energy with the field but its energy states "feel" the field and acquire phase shifts.
After experiencing this well timed sequence of resonant--dispersive--resonant interactions, the energy of the atom is measured and the atom is found to be either in state $\ket{0}$ or state $\ket{1}$.
The fraction of atoms that is found in state $\ket{0}$ or $\ket{1}$ shows a clear dependence on the phase shifts induced by the dispersive interaction in the central cavity.

We can understand this interference better if we follow the two internal states of the atom as it moves through the three cavities.

(ref:ramsey-figure-2-caption) The Ramsey interferometer represented as an abstract diagram. It should be read from left to right. The line segments represent transitions between the two states, $\ket{0}$ and $\ket{1}$,  and the numbers are the corresponding probability amplitudes.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/ramsey-figure-2-1} 

}

\caption{(ref:ramsey-figure-2-caption)}(\#fig:ramsey-figure-2)
\end{figure}

Suppose we are interested in the probability that the atom, initially in state $\ket{0}$, will be found, after completing its journey through the three cavities, in state $\ket{1}$.
As you can see in Figure \@ref(fig:ramsey-figure-2), this can happen in two ways, as indicated by the two red paths connecting the input state $\ket{0}$ on the left with the output state $\ket{1}$ on the right.
Again, let $U_{ij}$ denote the probability amplitude that input $\ket{j}$ generates output $\ket{i}$ (for $i,j=0,1$).
We can see from the diagram that
$$
  \begin{aligned}
    U_{10}
    &= \frac{1}{\sqrt2} e^{i\varphi_0}\frac{1}{\sqrt2} + \frac{1}{\sqrt2} e^{i\varphi_1}\frac{-1}{\sqrt2}
  \\&= \frac12 e^{i\varphi_0} - \frac12 e^{i\varphi_1}
  \\&= -ie^{i\varphi/2}\sin\frac{\varphi}{2},
  \end{aligned}
$$
where $\varphi = \varphi_0-\varphi_1$ is the relative phase.
The corresponding probability reads^[From the classical probability theory perspective the resonant interaction induces a random switch between $\ket{0}$ and $\ket{1}$ (why ?) and the dispersive interaction has no effect on these two states (why ?). Hence, one random switch followed by another random switch gives a random switch, right,  which gives  $\frac12$ for the probability that input $\ket{0}$ becomes output $\ket{1}$.]
$$
  \begin{aligned}
    P_{10}
    &= \vert U_{10}\vert^2
  \\&= \left\vert \frac12 e^{i\varphi_0} - \frac12 e^{i\varphi_1}\right\vert^2
  \\&= \frac12 - \frac12\cos\varphi.
  \end{aligned}
$$
You should recognise the first term, $\frac12$, as the "classical" probability and the second one, $-\frac12\cos\varphi$, as the interference term.
We can repeat such calculations for any other pair of input--output states.
This approach works fine here but, in general, tracking all possible paths in evolving quantum systems can become messy when the number of input and output states increases.
There is, however, a neat way of doing it via matrix multiplication.

The effect of each interaction on atomic states can be described by a matrix of transition amplitudes, as illustrated in Figure \@ref(fig:interference-matrix).
Then a sequence of independent interactions is described by the product of these matrices.
$$
  \begin{aligned}
    U &=
    \begin{bmatrix}
      \frac{1}{\sqrt2} & \frac{1}{\sqrt2}
    \\\frac{1}{\sqrt2} & \frac{-1}{\sqrt2}
    \end{bmatrix}
    \begin{bmatrix}
      e^{i\varphi_0} & 0
    \\0 & e^{i\varphi_1}
    \end{bmatrix}
    \begin{bmatrix}
      \frac{1}{\sqrt2} & \frac{1}{\sqrt2}
    \\\frac{1}{\sqrt2} & \frac{-1}{\sqrt2}
    \end{bmatrix}
  \\&= e^{i\frac{\varphi_0+\varphi_1}{2}}
    \begin{bmatrix}
      \cos\frac{\varphi}{2} & -i\sin\frac{\varphi}{2}
    \\\ -i\sin\frac{\varphi}{2}& \cos\frac{\varphi}{2}
    \end{bmatrix},
  \end{aligned}
$$
where $\varphi = \varphi_0-\varphi_1$.

(ref:interference-matrix-caption) The Ramsey interferometer represented as an abstract diagram (matrix approach). Here we have omitted the $\ket{0}$ and $\ket{1}$ labels, just to simply the diagram. We also ignore the global phase factor of $e^{i\frac{\varphi_0+\varphi_1}{2}}$.

![(\#fig:interference-matrix)(ref:interference-matrix-caption)](quantum-info_files/figure-latex/interference-matrix-1.pdf) 

In general, quantum operation $A$ followed by another quantum operation $B$ is a quantum operation described by the matrix product $BA$ (watch the order of matrices).
Indeed, the expression $(BA)_{ij}=\sum_k B_{ik}A_{kj}$ is the sum over amplitudes that input $\ket{j}$ generates output $\ket{i}$ via a specific intermediate state $\ket{k}$.
As you can see, the matrix approach is a wonderful bookkeeping tool for in one swap it takes care of both multiplying and adding probability amplitudes corresponding to all the contributing paths.





## Qubits, gates, and circuits

Atoms, trapped ions, molecules, nuclear spins and many other quantum objects with two pre-selected basis states labeled as $\ket{0}$ and $\ket{1}$ (from now on we will call such objects quantum bits or **qubits**) can be used to implement simple quantum interference.
There is no need to learn about physics behind these diverse technologies if all you want is to understand the basics of quantum theory.
We may now conveniently forget about any specific experimental realisation of a qubit and represent a generic **single qubit interference** graphically as a **circuit diagram**:^[Do not confuse the interference diagrams of Figure \@ref(fig:ramsey-figure) and Figure \@ref(fig:interference-matrix) with the circuit diagram. In the circuit diagrams, which we will use a lot from now on, a single qubit is represented by a single line.]


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-4-1} \end{center}

This diagram should be read from left to right.
The horizontal line represents a qubit that is inertly carried from one quantum operation to another. We often call this line a **quantum wire**.
The wire may describe translation in space (e.g. atoms travelling through cavities) or translation in time (e.g. a sequence of operations performed on a trapped ion).
The boxes or circles on the wire represent elementary quantum operations, called **quantum logic gates**.
Here we have two types of gates: two Hadamard gates $H$ (think about resonant interactions) and one phase gate $P_\varphi$ (think about dispersive interaction), where^[Global phase factors are irrelevant, it is the relative phase $\varphi =\varphi_1-\varphi_0$ that matters. In a single qubit phase gate we usually factor out $e^{i\varphi_0}$, which leaves us with the two diagonal entries: $1$ and $e^{i\varphi}$.]
$$
H=\begin{bmatrix}
    \frac{1}{\sqrt2} & \frac{1}{\sqrt2}
  \\\frac{1}{\sqrt2} & \frac{-1}{\sqrt2}
  \end{bmatrix}
  \quad\text{and}\quad
P_\varphi  = \begin{bmatrix}
    1 & 0
  \\0 & e^{i\varphi}
  \end{bmatrix}.
$$

The input qubits appear as state vectors on the left side of circuit diagrams, and the output qubits as state vectors on the right.
The product of the three matrices $HP_\varphi H$ (see Figure \@ref(fig:interference-matrix)) describes the action of the whole circuit: it maps input state vectors to output state vectors,^[$HP_\varphi H =\begin{bmatrix}\cos\frac{\varphi}{2} & -i\sin\frac{\varphi}{2}\\\ -i\sin\frac{\varphi}{2}& \cos\frac{\varphi}{2}\end{bmatrix}$.]
$$
  \begin{array}{lcr}
    \ket{0} & \mapsto & \cos\frac{\varphi}{2}\ket{0} - i\sin\frac{\varphi}{2}\ket{1},
  \\\ket{1}
    & \mapsto
    &- i\sin\frac{\varphi}{2}\ket{0} + \cos\frac{\varphi}{2}\ket{1}.
  \end{array}
$$





## Quantum decoherence

We do need quantum theory to describe many physical phenomena, but, at the same time, there are many other  phenomena where the classical theory of probability works pretty well.
We hardly see quantum interference on a daily basis.
Why?
The answer is **decoherence**.
The addition of probability amplitudes, rather than probabilities, applies to physical systems which are completely isolated.
However, it is almost impossible to isolate a complex quantum system, such as a quantum computer, from the rest of the world.
There will always be spurious interactions with the environment, and when we add amplitudes, we have to take into account not only different configurations of the physical system at hand, but also different configurations of the environment.

For example, consider an isolated system composed of a quantum computer and its environment.
The computer is prepared in some input state $I$ and generates output $O$.
Let us look at the following two scenarios:

1. _The computer is isolated and quantum computation does not affect the environment._
  The computer and the environment evolve independently from each other and, as a result, the environment does not hold any physical record of how the computer reached output $O$.
  In this case we add the amplitudes for each of the two alternative computational paths.


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-5-1} \end{center}

2. _Quantum computation affects the environment._
  The environment now holds a physical record of how the computer reached output $O$, which results in two final states of the composed system (computer + environment) which we denote $O_1$ and $O_2$.
  We add the probabilities for each of the two alternative computational paths.


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-6-1} \end{center}

When quantum computation affects the environment, we have to include the environment in our analysis for it now takes part in the computation.
Depending on which computational path was taken, the environment may end up in two distinct states.
The computer itself may show output $O$, but when we include the environment we have not one, but two outputs, $O_1$ and $O_2$, denoting, respectively, "computer shows output $O$ and the environment knows that path $1$ was taken" and "computer shows output $O$ and the environment knows that path $2$ was taken".
There are no alternative ways of reaching $O_1$ or $O_2$, hence there is no interference, and the corresponding probabilities read $p_1=|z_1|^2$ for $O_1$, and $p_2=|z_2|^2$ for $O_2$.
The probability that the computer shows output $O$, regardless the state of the environment, is the sum of of the two probabilities: $p=p_1+p_2$.
We have lost the interference term and any advantages of quantum computation along with it.
In the presence of decoherence the interference formula \@ref(eq:interference) is modified and reads
$$
p
= p_1 + p_2 + 2 v \sqrt{p_1 p_2}\cos (\varphi_2-\varphi_1),
$$
where the parameter $v$, called the **visibility** of the interference pattern, ranges from $0$ (the environment can perfectly distinguish between the two paths, total decoherence, no interference) to $1$ (the environment cannot distinguish between the two paths, no decoherence, full interference), with the values in between corresponding to partial decoherence.

![](quantum-info_files/figure-latex/unnamed-chunk-7-1.pdf)<!-- --> 

We shall derive this formula later on, and you will see that $v$ quantifies the degree of distinguishability between $O_1$ and $O_2$.
The more the environment knows about which path was taken the less interference we see.

::: {.idea data-latex=""}
  Decoherence suppresses quantum interference.
:::

Decoherence is chiefly responsible for our classical description of the world --- without interference terms we may as well add probabilities instead of amplitudes.
While decoherence is a serious impediment to building quantum computers, depriving us of the power of quantum interference, it is not all doom and gloom: there are clever ways around decoherence, such as quantum error correction and fault-tolerant methods we will meet later.





## Computation: deterministic, probabilistic, and quantum

Take one physical bit or a qubit.
It has two logical states: $\ket{0}$ and $\ket{1}$.
Bring another qubit and the combined systems has four logical states $\ket{00}, \ket{01},\ket{10}$ and $\ket{11}$.
In general $n$ qubits will give us $2^n$ states representing all possible binary strings of length $n$.
It is important to use subsystems --- here qubits --- rather than one chunk of matter, for operating on at most $n$ qubits we can reach any of the $2^n$ states of the composed system.
Now, let the qubits interact in a controllable fashion.
We are computing.
Think about computation as a physical process that evolves a prescribed initial configuration of a computing machine, called **$\texttt{INPUT}$**, into some final configuration, called **$\texttt{OUTPUT}$**.
We shall refer to the configurations as **states**.
Figure \@ref(fig:deterministic-computation) shows five consecutive computational steps performed on four distinct states.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/deterministic-computation-1} 

}

\caption{Deterministic computation.}(\#fig:deterministic-computation)
\end{figure}

That computation was **deterministic**: every time you run it with the same input, you get the same output.
But a computation does not have to be deterministic --- we can augment a computing machine by allowing it to "toss an unbiased coin" and to choose its steps randomly.
It can then be viewed as a directed^[So we read left to right, and omit the arrowheads.] tree-like graph where each node corresponds to a state of the machine, and each edge represents one step of the computation, as shown in Figure \@ref(fig:probabilistic-computation)

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/probabilistic-computation-1} 

}

\caption{Probabilistic computation.}(\#fig:probabilistic-computation)
\end{figure}

The computation starts from some initial state ($\texttt{INPUT}$) and it subsequently branches into other nodes representing states reachable with non-zero probability from the initial state.
The probability of a particular final state ($\texttt{OUTPUT}$)  being reached is equal to the sum of the probabilities along all mutually exclusive paths which connect the initial state with that particular state.
Figure \@ref(fig:probabilistic-computation) shows only two computational paths, but, in general, there could be many more paths (here, up to 256) contributing to the final probability.
Quantum computation can be represented by a similar graph, as in \@ref(fig:quantum-computation).

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/quantum-computation-1} 

}

\caption{Quantum computation.}(\#fig:quantum-computation)
\end{figure}

For quantum computations, we associate with each edge in the graph the probability _amplitude_ that the computation follows that edge.
The probability amplitude of a particular path to be followed is the product of amplitudes pertaining to transitions in each step.
The probability amplitude of a particular final state being reached is equal to the sum of the amplitudes along all mutually exclusive paths which connect the initial state with that particular state:
$$
  z = \sum_{\mathrm{all\,paths}\,k} z_k.
$$
The resulting probability, as we have just seen, is the sum of the probabilities pertaining to each computational path $p_k$ modified by the interference terms:
$$
  p
  = |z|^2
  = \sum_{k,j} z_j^\star z_k
  = \sum_k p_k
    + \sum_{k\ne j} \sqrt{p_k p_j}\cos(\varphi_k-\varphi_j).
$$

::: {.idea data-latex=""}
  Quantum computation can be viewed as a complex multi-particle quantum interference involving many computational paths through a computing device.
  The art of quantum computation is to shape quantum interference, through a sequence of computational steps, enhancing probabilities of correct outputs and suppressing probabilities of the wrong ones.
:::





## Computational complexity

Is there a compelling reason why we should care about quantum computation?
It may sound like an extravagant way to compute something that can be computed anyway.
Indeed, your standard laptop, given enough time and memory, can simulate pretty much any physical process.
In principle, it can also simulate any quantum interference and compute everything that quantum computers can compute.
The snag is, this simulation, in general, is very inefficient.
And efficiency does matter, especially if you have to wait more than the age of the Universe for your laptop to stop and deliver an answer!^[The age of the Universe is currently estimated at 13.772 billion years.]

In order to solve a particular problem, computers (classical or quantum) follow a precise set of instructions called an **algorithm**.
Computer scientists quantify the efficiency of an algorithm according to how rapidly its running time, or the use of memory, increases when it is given ever larger inputs to work on.
An algorithm is said to be **efficient** if the number of elementary operations taken to execute it increases no faster than a polynomial function of the size of the input.^[Note that the technological progress alone, such as increasing the speed of classical computers, will never turn an inefficient algorithm (exponential scaling) into an efficient one (polynomial scaling). Why?]
We take the input size to be the total number of binary digits (bits) needed to specify the input.
For example, using the algorithm taught in elementary school, one can multiply two $n$ digit numbers in a time that grows like the number of digits squared, $n^2$.
In contrast, the fastest-known method for the reverse operation --- factoring an $n$-digit integer into prime numbers --- takes a time that grows exponentially, roughly as $2^n$.
That is considered inefficient.

![](quantum-info_files/figure-latex/unnamed-chunk-8-1.pdf)<!-- --> 

The class of problems that can be solved by a deterministic computer in polynomial time is represented by the capital letter `P`, for _polynomial_ time.
The class of problems that can be solved in polynomial time by a probabilistic computer is called `BPP`, for _bounded-error probabilistic polynomial_ time.
It is clear that `BPP` contains `P`, since a deterministic computation is a special case of a probabilistic computation in which we never consult the source of randomness.
When we run a probabilistic (a.k.a. randomised) computation many times on the same input, we will not get the same answer every time, but the computation is useful if the probability of getting the right answer is high enough.
Finally, the complexity class `BQP`, for _bounded-error quantum polynomial_, is the class of problems that can be solved in polynomial time by a quantum computer.

![](quantum-info_files/figure-latex/unnamed-chunk-9-1.pdf)<!-- --> 

Since a quantum computer can easily generate random bits and simulate a probabilistic classical computer, `BQP` certainly contains the class `BPP`.
Here we are interested in problems that are in `BQP` but not known to be in `BPP`.
The most popular example of such a problem is factoring.

A quantum algorithm, discovered by Peter Shor in 1994, can factor $n$-digit numbers in a number of steps that grows only as $n^2$, as opposed to the $2^n$ that we have classically.^[It must be stressed that not all quantum algorithms are so efficient, in fact many are no faster than their classical counterparts. Which particular problems will lend themselves to quantum speed-ups is an open question.]
Since the intractability of factorisation underpins the security of many methods of encryption, Shor's algorithm was soon hailed as the first `killer application' for quantum computation: something very useful that only a quantum computer could do.
Since then, the hunt has been on for interesting things for quantum computers to do, and at the same time, for the scientific and technological advances that could allow us to build quantum computers.





## Outlook

When the physics of computation was first investigated, starting in the 1960s, one of the main motivations was a fear that quantum-mechanical effects might place fundamental bounds on the accuracy with which physical objects could render the properties of the abstract entities, such as logical variables and operations, that appear in the theory of computation.
It turned out, however, that quantum mechanics itself imposes no significant limits, but does break through some of those that classical physics imposed.
The quantum world has a richness and intricacy that allows new practical technologies, and new kinds of knowledge.
In this course we will merely scratch the surface of the rapidly developing field of quantum computation.
We will concentrate mostly on the fundamental issues and skip many experimental details.
However, it should be mentioned that quantum computing is a serious possibility for future generations of computing devices.
At present it is not clear how and when fully-fledged quantum computers will eventually be built;
but this notwithstanding, the quantum theory of computation already plays a much more fundamental role in the scheme of things than its classical predecessor did.
I believe that anyone who seeks a fundamental understanding of either physics, computation or logic must incorporate its new insights into their world view.





## Notes and Exercises

### {}

Back in 1926, Max Born simply postulated the connection between amplitudes and probabilities.
However, it is worth pointing out that he did not get it quite right on his first approach.
In the original paper^[Max Born, "Zur Quantenmechanik der Stoßvorgänge", _Zeitschrift für Physik_ **37** (1926), 893--867.] proposing the probability interpretation of the state vector (wavefunction) he wrote:

> ... If one translates this result into terms of particles only one interpretation is possible.
> $\Theta_{\eta,\tau,m}(\alpha,\beta,\gamma)$ [the wavefunction for the particular problem he is considering] gives the probability$^*$ for the electron arriving from the $z$ direction to be thrown out into the direction designated by the angles $\alpha,\beta,\gamma$...
>
> $^*$ Addition in proof: More careful considerations show that the probability is proportional to the square of the quantity $\Theta_{\eta,\tau,m}(\alpha,\beta,\gamma)$.

### {}

Complex numbers have many applications in physics, however, not until the advent of quantum theory was their ubiquitous and fundamental role in the description of the actual physical world so evident.
Even today, their profound link with probabilities appears to be a rather mysterious connection.
Mathematically speaking, the set of complex numbers is a field. This is an important algebraic structure used in almost all branches of mathematics.
You do not have to know much about algebraic fields to follow these lectures, but still, you should know the basics.
Look them up.

a. The set of rational numbers and the set of real numbers are both fields, but the set of integers is not. Why?
b. What does it mean to say that the field of complex numbers is **algebraically closed**?
c. Evaluate each of the following quantities:
  $$
    1+e^{-i\pi},
    \quad
    |1+i|,
    \quad
    (1+i)^{42},
    \quad
    \sqrt{i},
    \quad
    2^i,
    \quad
    i^i.
  $$
d. Here is a simple proof that $+1=-1$: $$1=\sqrt{1}=\sqrt{(-1)(-1)}=\sqrt{-1}\sqrt{-1}=i^2=-1.$$ What is wrong with it?

### {}

A quantum computer starts calculations in some initial state, then follows $n$ different computational paths which lead to the final output.
The computational paths are followed with probability amplitudes $\frac{1}{\sqrt n}e^{i k \varphi}$, where $\varphi$ is a fixed angle $0< \varphi <2\pi$ and $k=0,1,...n-1$.
Show that the probability of generating the output is^[$1+z+z^2+\ldots + z^n= \frac{1-z^{n+1}}{1-z}$]
$$
  \frac{1}{n}\left\vert
    \frac{1-e^{i n\varphi}}{1-e^{i\varphi}}
  \right\vert^2
  = \frac{1}{n} \frac{\sin^2 (n\frac{\varphi}{2})}{\sin^2 (\frac{\varphi}{2})}.
$$
for $0<\varphi<2\pi$, and $1$ for $\varphi=0$.
Plot the probability as a function of $\varphi$.

### {}

Imagine two distant stars, A and B, that emit _identical_ photons.
If you point a single detector towards them you will register a click every now and then, but you never know which star the photon came from.
Now prepare two detectors and point them towards the stars.
Assume the photons arrive with the probability amplitudes specified in Figure \@ref(fig:photons-from-stars).
Every now and then you will register a coincidence: the two detectors will fire.

a. Calculate the probability of a coincidence.
b. Now, assume that $z\approx \frac{1}{r}e^{i\frac{2r\pi}{\lambda}}$, where $r$ is the distance between detectors and the stars. How can we use this to measure $r$?

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/photons-from-stars-1} 

}

\caption{Two photon detectors pointing at two stars, with the probabilities of detection.}(\#fig:photons-from-stars)
\end{figure}

### Physics against logic?

Now that we have poked our heads into the quantum world, let us see how quantum interference challenges conventional logic and leads to qualitatively different computations.
Consider the following task: design a logic gate that operates on a single bit such that when it is followed by another, identical, logic gate the output is always the negation of the input.
Let us call this logic gate the square root of $\texttt{NOT}$ ($\sqrt{\texttt{NOT}}$).
A simple check, such as an attempt to construct a truth table, should persuade you that there is no such operation in logic.
It may seem reasonable to argue that since there is no such operation in logic, $\sqrt{\texttt{NOT}}$ is impossible.
Think again!

Figure \@ref(fig:sqrt-not) shows a simple computation, two identical computational steps performed on two states labelled as $0$ and $1$, i.e. on one bit.
An interplay of constructive and destructive interference makes some transitions impossible and the result is the logical $\texttt{NOT}$.
Thus, quantum theory declares, the square root of $\texttt{NOT}$ is possible.
And it does exist!
Experimental physicists routinely construct this and many other "impossible" gates in their laboratories.
They are the building blocks of a quantum computer.
Quantum theory explains the behaviour of $\sqrt{\texttt{NOT}}$, hence, reassured by the physical experiments that corroborate this theory, logicians are now entitled to propose a new logical operation $\sqrt{\texttt{NOT}}$.
Why?
Because a faithful physical model for it exists in nature.

Write a $2\times 2$ matrix which describes the $\sqrt{\texttt{NOT}}$ operation.
Is there just one such a matrix?
Suppose you are given a supply of Hadamard and phase gates with tuneable phase settings.
How would you construct the $\sqrt{\texttt{NOT}}$ gate?

(ref:sqrt-not-caption) A computation that, when repeated, gives exactly $\texttt{NOT}$. An unlabelled line means that it has probability $1$, and the lack of a line corresponds to having probability $0$.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/sqrt-not-1} 

}

\caption{(ref:sqrt-not-caption)}(\#fig:sqrt-not)
\end{figure}

### Quantum Bomb Tester

You have been drafted by the government to help in the demining effort in a former war-zone.^[This is a slightly modified version of a bomb testing problem described by Avshalom Elitzur and Lev Vaidman in _Quantum-mechanical interaction-free measurement_, Found. Phys. **47** (1993), 987-997.]
In particular, retreating forces have left very sensitive bombs in some of the sealed rooms.
The bombs are configured such that if even one photon of light is absorbed by the fuse (i.e. if someone looks into the room), the bomb will go off.
Each room has an input and output port which can be hooked up to external devices.
An empty room will let light go from the input to the output ports unaffected, whilst a room with a bomb will explode if light is shone into the input port and the bomb absorbs even just one photon --- see Figure \@ref(fig:bomb-detecting-scenario).

(ref:bomb-detecting-scenario-caption) _Left_ --- the passage of a photon through an empty room. _Right_ --- the passage of a photon through a room containing a bomb.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/bomb-detecting-scenario-1} 

}

\caption{(ref:bomb-detecting-scenario-caption)}(\#fig:bomb-detecting-scenario)
\end{figure}
    
Your task is to find a way of determining whether a room has a bomb in it without blowing it up, so that specialised (limited and expensive) equipment can be devoted to defusing that particular room.
You would like to know with certainty whether a particular room had a bomb in it.

1. To start with, consider the setup in Figure \@ref(fig:mach-zehnder-bomb-tester), where the input and output ports are hooked up in the lower arm of a Mach-Zehnder interferometer.^[Read about a Mach-Zehnder interferometer in [Supplement: Quantum interference revisited (still about beam-splitters)].]
    a. Assume an empty room.
      Send a photon to input port $\ket{0}$.
      Which detector, at the output port, will register the photon?
    b. Now assume that the room does contain a bomb.
      Again, send a photon to input port $\ket{0}$.
      Which detector will register the photon and with which probability?
    c. Design a scheme that allows you --- at least some of the time --- to decide whether a room has a bomb in it without blowing it up.
      If you iterate the procedure, what is its overall success rate for the detection of a bomb without blowing it up?

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/mach-zehnder-bomb-tester-1} 

}

\caption{The Mach-Zehnder interferometer hooked up to the bomb-testing room.}(\#fig:mach-zehnder-bomb-tester)
\end{figure}

2. Assume that the two beam splitters in the interferometer are different.
  Say the first beam-splitter reflects incoming light with probability $r$ and transmits with probability $t=1-r$, and the second one transmits with probability $r$ and reflects with probability $t$.
  Would the new setup improve the overall success rate of the detection of a bomb without blowing it up?

3. There exists a scheme, involving many beam-splitters and something called the **quantum Zeno effect**, such that the success rate for detecting a bomb without blowing it up approaches 100%.
  Try to work it out, or find a solution on the internet.

### {}

A quantum machine has $N$ perfectly distinguishable configurations.
What is the maximum number of computational paths connecting a specific input with a specific output after $k$ steps of the machine?
Suppose you are using your laptop to add together amplitudes pertaining to each of the paths.
As $k$ and $N$ increase you may need more time and more memory to complete the task.
How does the execution time and the memory requirements grow with $k$ and $N$?
Will you need more time or more memory or both?

### {}

The classical theory of computation is essentially the theory of the universal Turing machine --- the most popular mathematical model of classical computation.
Its significance relies on the fact that, given a large but finite amount of time, the universal Turing machine is capable of any computation that can be done by any modern classical digital computer, no matter how powerful.
The concept of Turing machines may be modified to incorporate quantum computation, but we will not follow this path.
It is much easier to explain the essence of quantum computation talking about quantum logic gates and quantum Boolean networks or circuits.
The two approaches are computationally equivalent, even though certain theoretical concepts, e.g. in computational complexity, are easier to formulate precisely using the Turing machine model.
The main advantage of quantum circuits is that they relate far more directly to proposed experimental realisations of quantum computation.

### {}

In computational complexity the basic distinction is between polynomial and exponential algorithms.
Polynomial growth is good and exponential growth is bad, especially if you have to pay for it.
There is an old story about the legendary inventor of chess who asked the Persian king to be paid only by a grain of cereal, doubled on each of the 64 squares of a chess board.
The king placed one grain of rice on the first square, two on the second, four on the third, and he was supposed to keep on doubling until the board was full.
The last square would then have $2^{63}=9,223,372,036,854,775,808$ grains of rice, more than has been ever harvested on planet Earth, to which we must add the grains of all previous squares, making the total number about twice as large.
If we placed that many grains in an unbroken line we would reach the nearest star Alpha Centauri, our closest celestial neighbour beyond the solar system, about $4.4$ light-years away.^[One light year (the distance that light travels through a vacuum in one year) is $9.4607 \times 10^{15}$m.]
The moral of the story: if whatever you do requires an exponential use of resources, you are in trouble.

### {}

In order to make qualitative distinctions between how different functions grow we will often use the asymptotic big-$O$ notation.
For example, suppose an algorithm running on input of size $n$ takes $a n^2+bn+c$ elementary steps, for some positive constants $a, b$ and $c$.
These constants depend mainly on the details of the implementation and the choice of elementary steps.
What we really care about is that, for large $n$, the whole expression is dominated by its quadratic term.
We then say that the running time of this algorithm grows as $n^2$, and we write it as $O(n^2)$, ignoring the less significant terms and the constant coefficients.
More precisely, let $f(n)$ and $g(n)$ be functions from positive integers to positive reals.
You may think of $f(n)$ and $g(n)$ as the running times of two algorithms on inputs of size $n$.
We say $f=O(g)$,^[$f=O(g)$ is pronounced as "$f$ is big-oh of $g$".] which means that $f$ grows no faster than $g$, if there is a constant $c>0$ such that $f(n)\leqslant c g(n)$ for all sufficiently large values of $n$.
Essentially, $f=O(g)$ is a very loose analogue of $f \leqslant g$.
In addition to the big-$O$ notation, computer scientists often use $\Omega$ for lower bounds: $f=\Omega (g)$ means $g=O(f)$.
Again, this is a very loose analogue of $f \geqslant g$.

1. When we say that $f(n)=O(\log n)$, why don't we have to specify the base of the logarithm?
2. Let $f(n)=5n^3+1000n+50$. Is $f(n)=O(n^3)$, or $O(n^4)$, or both?
3. Which of the following statements are true?

    a. $n^k=O(2^n)$ for any constant $k$
    b. $n!=O(n^n)$
    c. if $f_1=O(g)$ and $f_2=O(g)$, then $f_1+f_2=O(g)$.

### {}

There exists a randomised algorithm which tests whether a given number $N$ is prime.^[Primality used to be given as the classic example of a problem in \textsf{BPP} but not \textsf{P}. However, in 2002 a deterministic polynomial time test for primality was proposed by Manindra Agrawal, Neeraj Kayal, and Nitin Saxena. Thus, since 2002, primality has been in \textsf{P}.]
The algorithm always returns $\texttt{yes}$ when $N$ is prime, and the probability it returns $\texttt{yes}$ when $N$ is not prime is $\epsilon$, which not greater than a half (independently, each time you run the algorithm).
You run this algorithm (for the same $N$) $r$ times and each time the algorithm returns $\texttt{yes}$.
What is the probability that $N$ is not prime?

### {}

Suppose a randomised algorithm solves a decision problem, returning $\texttt{yes}$ or $\texttt{no}$ answers.
It gets the answer wrong with a probability not greater than $\frac12-\delta$, where $\delta>0$ is a constant.^[This result is known as the **Chernoff bound**.].
If we are willing to accept a probability of error no larger than $\epsilon$, then it suffices to run the computation $r$ times, where $r=O(\log 1/\epsilon)$.}

![](quantum-info_files/figure-latex/unnamed-chunk-10-1.pdf)<!-- --> 

1. If we perform this computation $r$ times, how many possible sequences of outcomes are there?
2. Give a bound on the probability of any particular sequence with $w$ wrong answers.
3. If we look at the set of $r$ outcomes, we will determine the final outcome by performing a majority vote.
  This can only go wrong if $w>r/2$.
  Give an upper bound on the probability of any single sequence that would lead us to the wrong conclusion.
4. Using the bound $1-x\leq e^{-x}$, conclude that the probability of our coming to the wrong conclusion is upper bounded by $e^{-2r\delta^2}$.

<!--chapter:end:01-interference.Rmd-->

# Qubits

:::: {.comment data-latex=""}
::: {.book-only}
[Click here to view this entire chapter on one page.](../tufte/qubits.html#qubits)
:::

::: {.tufte-only}
[Click here to view this chapter in the book.](../book/qubits.html#qubits)
:::
::::

> About quantum bits and quantum circuits, including the "impossible" square root of $\texttt{NOT}$, as well as an introduction to single-qubit unitaries and rotations of the Bloch sphere, and the implications concerning universal gates.





## Composing quantum operations 

In order to understand something in its full complexity it is always good to start with the simplest case.
Let us take a closer look at quantum interference in the simplest possible computing machine: the one that has only two distinguishable configurations  --- two quantum states --- which we label as $\ket{0}$ and $\ket{1}$.
We prepare the machine in some input state, usually $\ket{0}$, and let it **evolve**: the machine undergoes a prescribed sequence of computational steps, each of which induces transitions between the two "computational states", $\ket{0}$ and $\ket{1}$.
The machine then ends in the output state $\ket{\psi}=\alpha_0\ket{0}+\alpha_1\ket{1}$, meaning the two outputs, $\ket{0}$ and $\ket{1}$, are reached with probability amplitudes $\alpha_0$ and $\alpha_1$, respectively.
In the process of computation each computational step $U$ (also referred to as an **operation**) sends state $\ket{k}$ to state $\ket{l}$, where $k,l=0,1$, but only with some **amplitude** $U_{lk}$.
We write this as
\begin{equation}
  \ket{k} \mapsto \sum_l U_{lk} \ket{l}.
(\#eq:pulsemap)
\end{equation}
(watch out for the order of the indices).

Thus any computational step $U$ of this machine can be described by a matrix which tabulates all the transition amplitudes:
$$
  U =
  \begin{bmatrix}
    U_{00} & U_{01}
  \\U_{10} & U_{11}
  \end{bmatrix}.
$$
The matrix element $U_{lk}$ represents the amplitude of transition from state $\ket{k}$ to state $\ket{l}$ (again, watch the order of indices).
To be clear, the entries in this matrix are not any random complex numbers: their moduli squared represent transition probabilities, which in turn implies that such matrices must be **unitary**.^[Recall that matrix $U$ is called **unitary** if $$U^\dagger U = UU^\dagger = \id$$ where the **adjoint** or **Hermitian conjugate** $U^\dagger$ of any matrix $U$ with complex entries $U_{ij}$ is obtained by taking the complex conjugate of every element in the matrix and then interchanging rows and columns ($U^\dagger_{kl}= U^\star_{lk}$).]

We can also describe $U$ by drawing a diagram, which contains exactly the same information as the matrix representation, but just in a different form:


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-11-1} \end{center}

Now how can we find some quantum interference to study?
Consider two computational steps, $U$ and $V$.
What is the amplitude that input $\ket{k}$ will generate output $\ket{m}$?
We have to check all computational paths leading from input $\ket{k}$ to output $\ket{m}$ and add the corresponding amplitudes.
For example, as you can see in Figure \@ref(fig:composition-of-two-computation-steps), input $\ket{0}$ and output $\ket{1}$ are connected by the two computational paths: $\ket{0}\mapsto\ket{0}\mapsto\ket{1}$ (amplitude $V_{10}U_{00}$) and $\ket{0}\mapsto\ket{1}\mapsto\ket{1}$ (amplitude $V_{11}U_{10}$).
Thus the total amplitude that input $\ket{0}$ gives output $\ket{1}$ is the sum $V_{10}U_{00}+V_{11}U_{10}$, and when we take the modulus squared of this expression we will see the interference term.

(ref:composition-of-two-computation-steps-caption) The composition of two computational steps, $U$ and $V$, with the possible paths from $\ket{0}$ to $\ket{1}$ highlighted.

![(\#fig:composition-of-two-computation-steps)(ref:composition-of-two-computation-steps-caption)](quantum-info_files/figure-latex/composition-of-two-computation-steps-1.pdf) 

In general, given $U$ and $V$
$$
  \begin{aligned}
    \ket{k}
    &\mapsto
    \sum_l U_{lk}\ket{l}
  \\\ket{l}
    &\mapsto
    \sum_m V_{ml}\ket{m}
  \end{aligned}
$$
we can compose the two operations: we first apply $U$, and then $V$, to obtain
$$
  \begin{aligned}
    \ket{k}
    &\mapsto
    \sum_l U_{lk} \left(
      \sum_m V_{ml}\ket{m}
    \right)
  \\&=
    \sum_m \left(
      \sum_l V_{ml}U_{lk}
    \right) \ket{m}
  \\&=
    \sum_m (VU)_{mk} \ket{m}.
  \end{aligned}
$$

If you want to hone your quantum intuition think about it the following way.
The amplitude that input $\ket{k}$ evolves to $\ket{m}$ via a specific intermediate state $\ket{l}$ is given by $V_{ml}U_{lk}$ (evolutions are independent so the amplitudes are multiplied).
This done, we have to sum over all possible values of $l$ (the transition can occur in several mutually exclusive ways so the amplitudes are added) to obtain $\sum_l V_{ml}U_{lk}$.
Thus the matrix multiplication $VU$ (watch the order of matrices) in one swoop takes care of multiplication and addition of amplitudes corresponding to different computational paths.





## Quantum bits, called "qubits"

A two-state machine that we have just described in abstract terms is usually realised as a controlled evolution of a two state system, called a quantum bit or a qubit.
For example, state $\ket{0}$ may be chosen to be the lowest energy state of an atom, the **ground state**, and state $\ket{1}$ a higher energy state, the **excited state**.
Pulses of light of appropriate frequency, duration and intensity can take the atom back and forth between the basis states $\ket{0}$ and $\ket{1}$ (implementing logical $\texttt{NOT}$).

![](quantum-info_files/figure-latex/unnamed-chunk-12-1.pdf)<!-- --> 

Some other pulses, say, half the duration or intensity will take the atom into states that have no classical analogue.
Such states are called **coherent superpositions** of $\ket{0}$ and $\ket{1}$, and represent a qubit in state $\ket{0}$ with some amplitude $\alpha_0$ and in state $\ket{1}$ with some other amplitude $\alpha_1$.
This is conveniently represented by a state vector
$$
    \ket{\psi} =
    \alpha_0\ket{0} + \alpha_1\ket{1}
    \leftrightarrow
    \begin{bmatrix}
      \alpha_0
    \\\alpha_1
    \end{bmatrix}
$$

![](quantum-info_files/figure-latex/unnamed-chunk-13-1.pdf)<!-- --> 

::: {.idea data-latex=""}
  A **qubit** is a quantum system in which the Boolean states $0$ and $1$ are represented by a prescribed pair of normalised and mutually orthogonal quantum states labelled as $\{\ket{0},\ket{1}\}$.
  The two states form a so-called **computational** (or **standard**) basis, and so any other state of an isolated qubit can be written as a coherent superposition
  $$
    \ket{\psi} = \alpha_0\ket{0} + \alpha_1\ket{1}
  $$
  for some $\alpha_0$ and $\alpha_1$ such that $|\alpha_0|^2 + |\alpha_1|^2 = 1$.

  In practice, a qubit is typically a microscopic system, such as an atom, a nuclear spin, or a polarised photon.
:::

As we have already mentioned, any^[ Here we are talking about _isolated_ systems. As you will soon learn, a larger class of physically admissible operations is described by completely positive maps. It may sound awfully complicated but, as you will soon see, it is actually very simple.] computational step, that is, any physically admissible operation $U$ on a qubit, is described by a $(2\times 2)$ unitary matrix $U$.
It modifies the state of the qubit as
$$
  \ket{\psi}
  \mapsto
  \ket{\psi'}
  =
  U\ket{\psi}
$$
which we can write explicitly as
$$
  \begin{bmatrix}
    \alpha'_0
  \\\alpha'_1
  \end{bmatrix}
  =
  \begin{bmatrix}
    U_{00} & U_{01}
  \\U_{10} & U_{11}
  \end{bmatrix}
  \begin{bmatrix}
    \alpha_0
  \\\alpha_1
  \end{bmatrix}
$$
That is, the operation $U$ turns the state $\ket{\psi}$, with components $\alpha_k$, into the state $\ket{\psi'}=U\ket{\psi}$, with components $\alpha'_l= \sum_k U_{lk}\alpha_k$.





## Quantum gates and circuits

Atoms, trapped ions, molecules, nuclear spins and many other quantum objects, which we call qubits, can be used to implement simple quantum interference, and hence simple quantum computation.
There is no need to learn about physics behind these diverse technologies if all you want is to understand the basics of quantum computation.
We may now conveniently forget about any specific experimental realisation of a qubit and just remember that any manipulations on qubits have to be performed by physically admissible operations, and that such operations are represented by unitary transformations.

::: {.idea data-latex=""}
  A **quantum (logic) gate** is a device which performs a fixed unitary operation on selected qubits in a fixed period of time, and a **quantum circuit** is a device consisting of quantum logic gates whose computational steps are synchronised in time.
  The **sizes** of the circuit is the number of gates it contains.
:::

Some unitary $U$ acting on a single qubit is represented diagrammatically as


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-14-1} \end{center}

This diagram should be read from left to right.
The horizontal line represents a qubit that is inertly carried from one quantum operation to another.
We often call this line a **quantum wire**.
The wire may describe translation in space (e.g. atoms travelling through cavities) or translation in time (e.g. a sequence of operations performed on a trapped ion).
A sequence of two gates acting on the same qubit, say $U$ followed by $V$, is represented by


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-15-1} \end{center}

and is described by the matrix product $VU$ (note the order in which we multiply the matrices).





## Single qubit interference

Let me now describe what is probably the most important sequence of operations performed on a single qubit, namely a generic **single qubit interference**.
It is typically constructed as a sequence of three elementary operations:

1. the Hadamard gate
2. a phase shift gate
3. the Hadamard gate again.

We represent it graphically as


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-16-1} \end{center}

::: {.idea data-latex=""}
  | Hadamard | Phase |
  | :------: | :---: |
  | $H=\frac{1}{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}$ | $P_\varphi=\begin{bmatrix}1&0\\0&e^{i\varphi}\end{bmatrix}$ |
  | $\begin{array}{lcr}\ket{0}&\mapsto&\frac1{\sqrt{2}}(\ket{0}+\ket{1})\\\ket{1}&\mapsto&\frac1{\sqrt{2}}(\ket{0}-\ket{1})\end{array}$ | $\begin{array}{lcr}\ket{0}&\mapsto&\ket{0}\\\ket{1}&\mapsto&e^{i\varphi}\ket{1}\end{array}$ |
:::

You will see it over and over again, for it is quantum interference that gives quantum computation additional capabilities.
The product of the three matrices $HP_\varphi H$ describes the action of the whole circuit: it gives the transition amplitudes between states $\ket{0}$ and $\ket{1}$ at the input and the output as
$$
  e^{i\frac{\varphi}{2}}
  \begin{bmatrix}
    \cos\varphi/2 & -i\sin\varphi/2
  \\-i\sin\varphi/2 & \cos\varphi/2
  \end{bmatrix}
  =
  \frac{1}{\sqrt 2}
  \begin{bmatrix}
    1 & 1
  \\1 & -1
  \end{bmatrix}
  \begin{bmatrix}
    1 & 0
  \\0 & e^{i\varphi}
  \end{bmatrix}
  \frac{1}{\sqrt 2}
  \begin{bmatrix}
    1 & 1
  \\1 & -1
  \end{bmatrix}
$$

Given that our input state is almost always $\ket{0}$, it is sometimes much easier and more instructive to step through the execution of this circuit and follow the evolving state.
The interference circuit effects the following sequence of transformations:^[We ignore the global phase factor $e^{i\frac{\varphi}{2}}$.]
$$
  \begin{aligned}
    \ket{0}
    &\xmapsto{H}
    \frac{1}{\sqrt2} \left(
      \ket{0}+\ket{1}
    \right)
  \\&\xmapsto{P_\phi}
    \frac{1}{\sqrt2} \left(
      \ket{0}+e^{i\phi}\ket{1}
    \right)
  \\&\xmapsto{H}
    \cos\frac{\phi}{2}\ket{0} - i\sin\frac{\phi}{2}\ket{1}.
  \end{aligned}
$$
The first Hadamard gate prepares an equally weighted superposition of $\ket{0}$ and $\ket{1}$ and the second one closes the interference by bringing the interfering paths together.
The phase shift $\varphi$ effectively controls the evolution and determines the output.
The probabilities of finding the qubit in state $\ket{0}$ or $\ket{1}$ at the output are, respectively,
$$
  \begin{aligned}
    \Pr(0) &= \cos^2\frac{\phi}{2}
  \\\Pr(1) &= \sin^2\frac{\phi}{2}.
  \end{aligned}
$$
This simple quantum process contains, in a nutshell, the essential ingredients of quantum computation.
This sequence (Hadamard -- phase shift -- Hadamard) will appear over and over again.
It reflects a natural progression of quantum computation: first we prepare different computational paths, then we evaluate a function which effectively introduces phase shifts into different computational paths, then we bring the computational paths together at the output.





## The square root of NOT

Now that we have poked our heads into the quantum world, let us see how quantum interference challenges conventional logic.
Consider a following task: design a logic gate that operates on a single bit and such that when it is followed by another, identical, logic gate the output is always the negation of the input.
Let us call this logic gate **the square root of $\texttt{NOT}$**, or $\sqrt{\texttt{NOT}}$.

![](quantum-info_files/figure-latex/unnamed-chunk-17-1.pdf)<!-- --> 

A simple check, such as an attempt to construct a truth table, should persuade you that there is no such operation in logic.
It may seem reasonable to argue that since there is no such operation in logic, $\sqrt{\texttt{NOT}}$ is impossible.
But it does exist!
Experimental physicists routinely construct such ``impossible'' gates in their laboratories.
It is a physically admissible operation described by the unitary matrix^[There are infinitely many unitary operations that act as the square root of $\texttt{NOT}$.]
$$
  \sqrt{\texttt{NOT}}
  =
  \frac12
  \begin{bmatrix}
    1+i & 1-i
  \\1-i&1+i
  \end{bmatrix}
  =
  \frac1{\sqrt2}
  \begin{bmatrix}
    e^{i\frac{\pi}{4}} & e^{-i\frac{\pi}{4}}
  \\e^{-i\frac{\pi}{4}} & e^{i\frac{\pi}{4}}
  \end{bmatrix}.
$$
Indeed,
$$
  \frac12
  \begin{bmatrix}
    1+i & 1-i
  \\1-i & 1+i
  \end{bmatrix}
  \frac12
  \begin{bmatrix}
    1+i & 1-i
  \\1-i & 1+i
  \end{bmatrix}
  =
  \begin{bmatrix}
    0&1
  \\1&0
  \end{bmatrix}.
$$

We could also step through the circuit diagram and follow the evolution of the state vector:


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-18-1} \end{center}

Or, if you prefer to work with column vectors and matrices, you can write the two consecutive application of $\sqrt{\texttt{NOT}}$ to state $\ket{0}$ as
$$
  \begin{bmatrix}0\\1\end{bmatrix}
  \,\longleftarrow\!\!\!\vert\,\,
  \frac{1}{\sqrt 2}
  \begin{bmatrix}
    e^{i\frac{\pi}{4}}
  \\e^{-i\frac{\pi}{4}}
  \end{bmatrix}
  \,\longleftarrow\!\!\!\vert\,\,
  \begin{bmatrix}1\\0\end{bmatrix}
$$
(following a well established convention, the above should be read from _right to left_)^[Just remember that circuits diagrams are read from _left to right_, and vector and matrix operations go from _right to left_.], where each $\longleftarrow\!\!\!\vert$ denotes multiplication by $\frac1{\sqrt2}\begin{bmatrix}e^{i\frac{\pi}{4}} & e^{-i\frac{\pi}{4}}\\e^{-i\frac{\pi}{4}} & e^{i\frac{\pi}{4}}\end{bmatrix}$.


One way or another, quantum theory explains the behaviour of $\sqrt{\texttt{NOT}}$, and so, reassured by the physical experiments^[We discuss this in more detail in [Appendix: Physics against logic, via beamsplitters].] that corroborate this theory, logicians are now entitled to propose a new logical operation $\sqrt{\texttt{NOT}}$.
Why?
Because a faithful physical model for it exists in nature!





## Phase gates galore

As well as the generic phase gate $P_\varphi$, let us mention three specific phase gates that will frequently pop up (two of which have rather confusing names, at first glance!).

::: {.idea data-latex=""}
  | Generic phase | Phase-flip | $\pi/4$-phase | $\pi/8$-phase |
  | :-----------: | :--------: | :-----------: | :-----------: |
  | $P_\varphi=\begin{bmatrix}1&0\\0&e^{i\varphi}\end{bmatrix}$ | $Z=\begin{bmatrix}1&0\\0&-1\end{bmatrix}$ | $S=\begin{bmatrix}1&0\\0&i\end{bmatrix}$ | $T=\begin{bmatrix}1&0\\0&e^{i\frac{\pi}{4}}\end{bmatrix}$ |
:::

Note that the phase gate $P_\varphi$ is only defined up to a global phase factor,^[In general, states differing only by a global phase are physically indistinguishable, and so it is physical experimentation that leads us to this mathematical choice of only defining things up to a global phase.] and so we can write its matrix either as
$$
  P_\varphi =
  \begin{bmatrix}
    1 & 0
  \\0 & e^{i\varphi}
  \end{bmatrix}
$$
or as
$$
  P_\varphi =
  \begin{bmatrix}
    e^{-i\frac{\varphi}{2}} & 0
  \\0 & e^{i\frac{\varphi}{2}}
  \end{bmatrix}
$$
The first version is more common in the quantum information science community, but the second one is sometimes more convenient to use, as it has determinant $1$, and hence belongs to the group $\mathrm{SU}(2)$.
We will occasionally switch to the $\mathrm{SU}(2)$ version of a phase gates, and this is where the $\pi/4$-phase and $\pi/8$-phase gates get their names, since their $\mathrm{SU}(2)$ versions have $e^{\mp i\pi/4}$ and $e^{\mp i\pi/8}$ (respectively) on the diagonal.

The remaining gate ($Z$) is arguably the most important specific phase gate, since it is one of the **Pauli operators**, which we will now discuss.





## Pauli operators

Adding to our collection of common single-qubit gates, we now look at the three **Pauli operators**^[We use the standard basis $\{\ket{0},\ket{1}\}$ most of the time, and so often refer to operators as matrices.] $\sigma_x$, $\sigma_y$, and $\sigma_z$, also denoted by $X$, $Y$, and $Z$ (respectively).
These three operators, combined with the identity, satisfy a lot of nice formal properties, which we shall examine briefly here, and the return to in more detail in [Linking Pauli matrices and the Bloch sphere].

::: {.idea data-latex=""}
  | Identity | Bit-flip | Bit-phase-flip | Phase-flip |
  | :------: | :------: | :------------: | :--------: |
  | $\id=\begin{bmatrix}1&0\\0&1\end{bmatrix}$ | $X=\begin{bmatrix}0&1\\1&0\end{bmatrix}$ | $Y=\begin{bmatrix}0&-i\\i&0\end{bmatrix}$ | $Z=\begin{bmatrix}1&0\\1&-1\end{bmatrix}$ |
:::

The identity is just a quantum wire, and we have already seen the $X$ and $Z$ gates in [Phase gates galore], as the bit-flip and phase-flip (respectively).
Note that, of these latter two, only the $X$ gate has a classical analogue (as the logical $\texttt{NOT}$ operator).
The remaining gate, the $Y$ operator, describes the combined effect of both the bit- and the phase-flip: $ZX=iY$.

In fact, this is just one of the equations that the Pauli matrices satisfy.
The Pauli matrices are unitary and Hermitian, they square to the identity, and they anti-commute.
By this last point, we mean that
$$
  \begin{aligned}
    XY+YX&=0,
  \\XZ+ZX&=0,
  \\YZ+ZY&=0.
  \end{aligned}
$$
As already mentioned, they satisfy $ZX=iY$, but also any cyclic permutation of this equation.

These operators are also called **sigma matrices**, or **Pauli spin matrices**.
They are so ubiquitous in quantum physics that they should certainly be memorised.





## From bit-flips to phase-flips, and back again

The Pauli $Z$ gate is a special case of a phase gate $P_\varphi$ with $\varphi=\pi$.
When we insert it into the interference circuit we obtain


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-19-1} \end{center}

If you wish to verify this, write the Hadamard gate as $H = (X+Z)/\sqrt{2}$ and use the properties of the Pauli operators.^[$\begin{aligned}HXH &= Z\\HZH &= X\\HYH &= -Y\end{aligned}$]
So the Hadamard gate turns phase-flips into bit-flips, but it also turns bit-flips into phase-flips:


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-20-1} \end{center}

Let us also add, for completeness, that $HYH=-Y$.
You will see these identities again and again, especially when we discuss quantum error corrections.^[Unitaries, such as $H$, that take the three Pauli operators to the Pauli operators via conjugation form the so-called **Clifford group**, which we will meet later on. Which phase gate is in the Clifford group of a single qubit?]





## Any unitary operation on a single qubit

There are infinitely many unitary operations that can be performed on a single qubit.
In general, any complex $(n\times n)$ matrix has $n^2$ complex entries, and can thus be specified by $2n^2$ real independent parameters.
The unitarity constraint removes $n^2$ of these, and so any unitary $(n\times n)$ matrix has $n^2$ real independent parameters.
In particular, we need _four_ real parameters to specify a $(2\times 2)$ unitary matrix.
If we are prepared to ignore global phase factors (which we are) then there are only three real parameters left.
So, with this in mind, can we construct and implement any unitary on a single qubit in some simple way?

_Yes, we can._

Any unitary operation on a qubit (up to an overall multiplicative phase factor) can be implemented by a circuit containing just two Hadamards and three phase gates, with adjustable phase settings, as in Figure \@ref(fig:universal-circuit-for-2-by-2).

(ref:universal-circuit-for-2-by-2-caption) The universal circuit for unitary $(2\times2)$ matrices.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/universal-circuit-for-2-by-2-1} 

}

\caption{(ref:universal-circuit-for-2-by-2-caption)}(\#fig:universal-circuit-for-2-by-2)
\end{figure}

If we multiply the matrices corresponding to each gate in the network (remember that the order of matrix multiplication is reversed) we obtain
$$
  U(\alpha,\beta,\gamma)
  =\begin{bmatrix}
    e^{-i\left(\frac{\alpha+\beta}{2}\right)}\cos\varphi/2
    & -ie^{i\left(\frac{\alpha-\beta}{2}\right)}\sin\varphi/2
  \\-ie^{-i\left(\frac{\alpha-\beta}{2}\right)}\sin\varphi/2
    & e^{i\left(\frac{\alpha+\beta}{2}\right)}\cos\varphi/2
  \end{bmatrix}.
$$
Any $(2\times 2)$ unitary matrix (up to global phase) can be expressed in this form using the three independent real parameters, $\alpha$, $\beta,$ and $\varphi$, which take values in $[0,2\pi]$.
In order to see that this construction does what it claims, let us explore an intriguing mathematical connection between single qubit unitaries and rotations in three dimensions.





## The Bloch sphere

Unitary operations on a single qubit form a group.
More precisely, the set of all $(2\times 2)$ unitary matrices forms a non-abelian group under the matrix multiplication, denoted by $\mathrm{U}(2)$.
It turns out that compositions of single qubit unitaries behave pretty much the same as compositions of rotations in three dimensions.
Technically speaking, $\mathrm{U}(2)/\mathrm{U}(1)\cong \mathrm{SO}(3)$.^[Note that $\mathrm{U}(1)\cong\mathbb{C}^\times$, where $\mathbb{C}^\times$ is the multiplicative group of unit elements of the complex numbers, i.e. the set $\mathbb{C}\setminus\{0\}$ with the group operation given by multiplication.]
That is, $(2\times 2)$ unitaries, up to global phase, form a group which is isomorphic to the group of rotations in three dimensions, denoted by $\mathrm{SO}(3)$.
This isomorphism helps to visualise the actions of single qubit gates.

There are many ways to introduce this isomorphism.
Here we will first show how to represent single-qubit state vectors in terms of Euclidean vectors in three dimensions, and then relate unitary operations on state vectors to rotations in this Euclidean space.

Any single qubit state can be written as $\ket{\psi}=\alpha\ket{0}+\beta\ket{1}$, constrained by the relation $|\alpha|^2+|\beta|^2=1$.
This suggests a more natural parametrisation as^[There is a good reason to use $\theta/2$ instead of $\theta$, which we will explain later on.]
$$
  \ket{\psi} =
  \cos\frac{\theta}{2}e^{i\varphi_0}\ket{0}
  + \sin\frac{\theta}{2}e^{i\varphi_1}\ket{1}.
$$
We can then factor out a global phase:
$$
  \ket{\psi} =
  e^{i\varphi_0}\left(
    \cos\frac{\theta}{2}\ket{0} + \sin\frac{\theta}{2}e^{i\varphi}\ket{1}
  \right),
$$
and even remove it completely, since states that are identical up to a global phase are physically indistinguishable.

The parametrisation in terms of $\theta$ and $\varphi$ should remind you of spherical polar coordinates for the surface of a sphere.

(ref:bloch-sphere-caption) The Bloch sphere, with the point $\vec{s}$ corresponding to $\ket{\psi}$ marked.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/bloch-sphere-1} 

}

\caption{(ref:bloch-sphere-caption)}(\#fig:bloch-sphere)
\end{figure}

We call this sphere the **Bloch sphere**, and the unit vector ${\vec s}$ defined by $\theta$ and $\varphi$ the **Bloch vector**.^[We will revisit this construction again in more detail, and from a slightly different point of view, in [Linking Pauli matrices and the Bloch sphere].]
This is a very useful way to visualise quantum states of a single qubit and unitary operations that we perform on it.
Any unitary action on the state vector will induce a rotation of the corresponding Bloch vector.
But what kind of rotation?

Note that any two orthogonal state vectors appear on the Bloch sphere as two Bloch vectors pointing in opposite directions.
Now, the two eigenvectors of a single-qubit unitary $U$ must be orthogonal, and thus define an axis running through the centre of the Bloch sphere.
This is the axis about which the Bloch vector is rotated when $U$ acts on the corresponding state vector.
The rotation angle $\alpha$ is given by the eigenvalues of $U$, which, up to a global phase factor, are of the form $e^{\mp i\alpha/2}$.

It is instructive to work out few simple cases and get a feel for the rotations corresponding to the most common unitaries.
For example, it is easy to check that a phase gate $P_\alpha$ acts by
$$
  \cos\frac{\theta}{2}\ket{0} + e^{i\varphi}\sin\frac{\theta}{2}\ket{1}
  \longmapsto
  \cos\frac{\theta}{2}\ket{0} + e^{i(\varphi+\alpha)}\sin\frac{\theta}{2}\ket{1}.
$$
The azimuthal angle changes from $\varphi$ to $\varphi+\alpha$, and so the Bloch sphere is rotated anticlockwise by $\alpha$ about the $z$-axis.
The Bloch vectors corresponding to the two eigenvectors of $P_\alpha$, namely $\ket{0}$ and $\ket{1}$, define the axis of the rotation.

(ref:bloch-sphere-rotation-caption) Phase gates $P_\alpha$ represent rotations of the Bloch sphere around the $z$-axis.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/bloch-sphere-rotation-1} 

}

\caption{(ref:bloch-sphere-rotation-caption)}(\#fig:bloch-sphere-rotation)
\end{figure}

As previously mentioned, the Pauli operator  $Z=\sigma_z$ is a special case of a phase gate, and represents rotation by ${180}^{\circ}$ (that is, $\pi$ radians), about the $z$-axis.
You can also verify that $X=\sigma_x$, with eigenvectors ${(\ket{0}\pm\ket{1})/\sqrt{2}}$, represents rotation by ${180}^{\circ}$ about the $x$-axis, and $Y=\sigma_y$, with eigenvectors ${(\ket{0}\pm i\ket{1})/\sqrt{2}}$, represents rotation by ${180}^{\circ}$ about the $y$-axis.

How about the Hadamard gate?
Like the Pauli operators, it squares to the identity ($H^2=\id$), which implies that its eigenvalues are $\pm 1$.
Thus it will correspond to a rotation by ${180}^{\circ}$.
But about which axis?
This time, rather than finding eigenvectors of $H$, we notice that $HXH=Z$ and $HZH=X$, thus $H$ must swap $x$- and $z$-axes, turning rotations about the $z$-axis into rotations about the $x$-axis, and vice versa.
The Hadamard gate must then represent rotation by ${180}^{\circ}$ about the diagonal $(x+z)$-axis.
You may also notice that, after this rotation, the $y$-axis points in the opposite direction, which seems to be related to another identity: $HYH=-Y$.
This is not a coincidence.

One can show^[Again, see [Linking Pauli matrices and the Bloch sphere].] that the effect of the rotation represented by unitary $U$ on the Bloch vector with components $s_x$, $s_y$, $s_z$ is summarised in the formula
$$
  U (s_x X + s_y Y + s_z Z) U^\dagger
  = s'_x X+ s'_y Y + s'_z Z,
$$
where $s'_x$, $s'_y$, and $s'_z$ are the components of the rotated Bloch vector.





## Composition of rotations

We are now in a position understand the circuit in Figure \@ref(fig:universal-circuit-for-2-by-2) in geometric terms.
Recall that _any_ rotation in the Euclidean space can be performed as a sequence of three rotations: one about the $z$-axis, one about the $x$-axis, and one more about $z$-axis.
The circuit does exactly this:


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-21-1} \end{center}

The first phase gate effects rotation by $\alpha$ about the $z$-axis, the second phase gate is sandwiched between the two Hadamard gates, and these three gates together effect rotation by $\varphi$ about the $x$-axis, and, finally, the third phase gates effects rotation by $\beta$ about the $z$-axis.
So we can implement any unitary $U$ by choosing the three phase shifts, $\alpha$, $\varphi$, and $\beta$, which are known as the three **Euler's angles**.






## A finite set of universal gates

The Hadamard gate and the phase gates, with adjustable phases, allow us to implement an arbitrary single-qubit unitary _exactly_.
The tacit assumption here is that we have here _infinitely many_ phase gates: one gate for each phase.
In fact, we can pick just one phase gate, namely any phase gate $P_\alpha$ with the phase $\alpha$ that is incommensurate^[That is, there do _not_ exist any $m,n\in\mathbb{Z}$ such that $m\alpha=n\pi$. For example, it suffices to take $\alpha$ to be rational.] with $\pi$.
It is clear that repeated iteration of $P_\alpha$ can be used to approximate any other phase gate to arbitrary accuracy: indeed, rotate the Bloch sphere by $\alpha$ about the $z$-axis sufficiently many times and you end up as close as you please to any other rotation about the $z$-axis.

If you want to be $\epsilon$-close to the desired angle of rotation, then you may need to repeat the rotation by $\alpha$ roughly $1/\epsilon$ times.
Indeed, within $n$ applications (for $n\alpha\gg 2\pi$) of $P_\alpha$, we expect the accessible angles to be approximately evenly distributed within the range $[0,2\pi]$, i.e. any angle of rotation can be achieved to an accuracy of $\epsilon=2\pi/n$ by using up to $n\approx 1/\epsilon$ applications of $P_\alpha$.
So we can use _just one_ phase gate to _approximate_ the _three_ phase gates in the circuit in Figure \@ref(fig:universal-circuit-for-2-by-2).

There are other ways of implementing irrational rotations of the Bloch sphere.
For example, take the Hadamard gate and the $T$ gate.
You can check that the compositions $THTH$ and $HTHT$ represent rotations by angles which are irrational multiples of $\pi$, about two different axes.
We can then compose a sequence of these two rotations to approximate any other rotation of the sphere.
This may look very nice in theory, but there are issues with the actual physical implementation of this approach.
All the gates in the circuit will operate with finite precision, and the phase gates will deviate from implementing the required irrational rotations.
It turns out, however, that we can tolerate minor imperfections; the final result will not be that far off.

For more details on all the above, see [Linking Pauli matrices and the Bloch sphere].





## Appendix: Physics against logic, via beamsplitters

> The square root of $\texttt{NOT}$, and showing that it can be as simple as a symmetric beam-splitter.
> In fact, playing with mirrors and beam-splitters can give you lots of insights into the quantum world.

A symmetric beam-splitter is a cube of glass which reflects half the light that impinges upon it, while allowing the remaining half to pass through unaffected.
For our purposes it can be viewed as a device which has two input and two output ports which we label as $\ket{0}$ and $\ket{1}$, as in Figure \@ref(fig:beam-splitter).

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/beam-splitter-1} 

}

\caption{A beam-splitter.}(\#fig:beam-splitter)
\end{figure}

When we aim a single photon at such a beam-splitter using one of the input ports, we notice that the photon doesn't split in two: we can place photo-detectors wherever we like in the apparatus, fire in a photon, and verify that if any of the photo-detectors registers a hit, none of the others do.
In particular, if we place a photo-detector behind the beam-splitter in each of the two possible exit beams, the photon is detected with equal probability at either detector, no matter whether the photon was initially fired from input port $\ket{0}$ or $\ket{1}$.

It may seem obvious that, at the very least, the photon is _either_ in the transmitted beam $\ket{0}$ _or_ in the reflected beam $\ket{1}$ during any one run of this experiment.
Thus we may be tempted to think of the beam-splitter as a random binary switch which, with equal probability, transforms any binary input into one of the two possible outputs.
However, that is not necessarily the case.
Let us introduce a second beam-splitter and place two normal mirrors so that both paths intersect at the second beam-splitter, resulting in something resembling the Mach-Zehnder interferometer (see \@ref(fig:two-beam-splitters)).

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/two-beam-splitters-1} 

}

\caption{Two beam-splitters with mirrors, so that a photon travels through both.}(\#fig:two-beam-splitters)
\end{figure}

Now, the axiom of additivity in probability theory says that whenever something can happen in several alternative ways we add probabilities for each way considered separately.
We might argue that a photon fired into the input port $\ket{0}$ can reach the detector $0$ in two _mutually exclusive_ ways: either by two consecutive reflections or by two consecutive transmissions.
Each reflection happens with probability $1/2$ and each transmission happens with probability $1/2$ thus the total probability of reaching detector 0 is a sum of the probability of the two consecutive reflections ($1/2\times 1/2 = 1/4$) and the probability of the two consecutive transmissions ($1/2\times 1/2 = 1/4$) which gives probability $1/2$.
This is summarised in \@ref(fig:classical-guess-double-beam-splitter), and makes perfect sense --- a random switch followed by a random switch should give nothing else but a random switch.
However, if we set up such an experiment, that is not what happens!

::: {.idea data-latex=""}
  There is no reason why probability theory or any other a priori mathematical construct should make any meaningful statements about outcomes of physical experiments.
:::

![(\#fig:classical-guess-double-beam-splitter)The two possible classical scenarios. Note that this is **not** what actually happens in the real physical world!](quantum-info_files/figure-latex/classical-guess-double-beam-splitter-1.pdf) 

In experimental reality, when the optical paths between the two beam-splitters are the same, the photon fired from input port $\ket{0}$ _always_ strikes detector 1 and _never_ detector 0 (and the photon fired from input port $\ket{1}$ _always_ strikes detector 0 and _never_ detector 1).
Thus a beam-splitter acts as the square root of $\texttt{NOT}$ gate.

The action of the beam-splitter --- in fact, the action of any quantum device --- can be described by tabulating the amplitudes of transitions between its input and output ports.^[Note that gate $B$ is not the same square root of $\texttt{NOT}$ as the one described in the first diagram in this section. There are infinitely many ways of implementing this "impossible" logical operation.]
\begin{equation}
  B = 
  \begin{bmatrix}
  B_{00} & B_{01}\\
  B_{10} & B_{11}
  \end{bmatrix}
  =
  \begin{bmatrix}
  \frac{1}{\sqrt 2} & \frac{i}{\sqrt 2}\\
  \frac{i}{\sqrt 2} & \frac{1}{\sqrt 2}
  \end{bmatrix}.
(\#eq:beam-splitter)
\end{equation}
The matrix element $B_{lk}$, where $k,l=0,1$, represents the amplitude of transition from input  $\ket{k}$ to output  $\ket{l}$ (watch the order of indices).
Each reflection (entries $B_{01}$ and $B_{10}$) happens with amplitude $i/\sqrt{2}$ and each transmission  (entries $B_{00}$ and $B_{11}$) happens with amplitude $1/\sqrt{2}$.
Thus the total amplitude that a photon fired from input port $\ket{0}$ will reach detector $0$ is the sum of the amplitude of the two consecutive reflections ($i/\sqrt{2}\times i/{\sqrt 2} = -1/2$) and the amplitude of the two consecutive transmissions ($1/{\sqrt 2}\times 1/{\sqrt 2} = 1/2$) which gives the total amplitude $0$.
The resulting probability is then zero.
Unlike probabilities, amplitudes can cancel out each other out.
We can now go on and calculate the amplitude that the photon will reach detector $1$.
In this case we will get $i$, which gives probability $1$.
We can then switch to input $\ket{1}$ and repeat our calculations.
All possible paths and associated amplitudes are shown in \@ref(fig:paths-and-amplitudes-two-beam-splitters).

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/paths-and-amplitudes-two-beam-splitters-1} 

}

\caption{All possible transitions and their amplitudes when we compose two beam-splitters $B$.}(\#fig:paths-and-amplitudes-two-beam-splitters)
\end{figure}

However, instead of going through all the paths in this diagram and linking specific inputs to specific outputs, we can simply multiply the transition matrices:
$$
  BB =
  \begin{bmatrix}
    \frac{1}{\sqrt 2} & \frac{i}{\sqrt 2}\\
    \frac{i}{\sqrt 2} & \frac{1}{\sqrt 2}
  \end{bmatrix}
  \begin{bmatrix}
    \frac{1}{\sqrt 2} & \frac{i}{\sqrt 2}\\
    \frac{i}{\sqrt 2} & \frac{1}{\sqrt 2}
  \end{bmatrix}
  =
  \begin{bmatrix}
  0 & i\\
  i & 0
  \end{bmatrix}
  = iX
$$
where $X=\begin{bmatrix}0&1\\1&0\end{bmatrix}$ is the $\texttt{NOT}$ operator.

Recalling [The square root of NOT], we see that beam-splitters give a physical way of constructing the square root of $\texttt{NOT}$.

::: {.idea data-latex=""}
  | $\texttt{NOT}$ | $\sqrt{\texttt{NOT}}$ |
  | :------------: | :-------------------: |
  | $X = \begin{bmatrix}0&1\\1&0\end{bmatrix}$ | $B = \frac{1}{\sqrt2}\begin{bmatrix}1&i\\i&1\end{bmatrix}$ |
  | bit flip | beam-splitter |
:::





## Appendix: Quantum interference revisited (still about beam-splitters)

One of the simplest quantum devices in which quantum interference can be controlled is a **Mach--Zehnder interferometer** --- see Figure \@ref(fig:mach-zehnder).

(ref:mach-zehnder-caption) The [Mach-Zehnder interferometer](https://en.wikipedia.org/wiki/Mach-Zehnder_interferometer), with the input photon represented by the coloured dot. This experimental set-up is named after the physicists Ludwig Mach and Ludwig Zehnder, who proposed it back in 1890s.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/mach-zehnder-1} 

}

\caption{(ref:mach-zehnder-caption)}(\#fig:mach-zehnder)
\end{figure}

It consists of two beam-splitters (the square boxes, bottom left and top right) and two slivers of glass of different thickness which are inserted into each of the optical paths connecting the two beam-splitters.
The slivers are usually referred to as "phase shifters" and their thicknesses, $\varphi_0$ and $\varphi_1$, are measured in units of the photon's wavelength multiplied by $2\pi$.
The two inputs ports of the interferometer are labelled as $\ket{0}$ and $\ket{1}$, and each of the two output ports, also labelled as $0$ and $1$, terminates in a photodetector.^[The two diagonal objects in the top-left and bottom-right corners of \@ref(fig:mach-zehnder) are simply mirrors to make the two possible paths meet at the second beam-splitter.]

A photon (the coloured dot in the figure) impinges on the first beam-splitter from one of the two input ports (here input 1) and begins its journey towards one of the two photodetectors.
Let^[We will often use $i$ as an index even though it is also used for the imaginary unit. Hopefully, no confusion will arise for it should be clear from the context which one is which.] $U_{ij}$ denote the probability amplitude that the photon initially in input port $j=0,1$ ends up in detector $i=0,1$.
At each of the two beam-splitters the photon is transmitted with the probability amplitude $\sqrt{T}$ and reflected with the probability amplitude $i\sqrt{R}$, with $R+T=1$, and the two phase shifters modify the amplitudes by phase factors $e^{i\varphi_0}$ and $e^{i\varphi_1}$, respectively.
In quantum theory we almost always start with the amplitudes, and once we have a full expression for the amplitude of a given outcome we square its absolute value to get the corresponding probability.
For example, let us calculate  $U_{00}$.

We notice that there are two alternative ways for the photon in the input port $0$ to end up in the output port $0$.
It can take the lower path, through the phase shifter $\varphi_0$, or the upper path, through the phase shifter $\varphi_1$.
The lower path implies two consecutive transmissions at the beam-splitters and the phase factor $e^{i\varphi_0}$, whereas the upper path implies two consecutive reflections and the phase factor $e^{i\varphi_1}$.
Once the photon ends in the output port $0$ there is no way of knowing which path was taken, thus we add the amplitudes pertaining to each path.
The resulting amplitude is
$$
  U_{00}
  = \sqrt{T} e^{i\varphi_0} \sqrt{T}
  + i\sqrt{R} e^{i\varphi_1} i \sqrt{R},
$$
and the corresponding probability $P_{00}=|U_{00}|^2$ reads
$$
  \begin{aligned}
    P_{00}
    & = \left\vert
          \sqrt{T}e^{i\varphi_0}\sqrt{T} + i\sqrt{R}e^{i\varphi_1}i\sqrt{R}
        \right\vert^2
      = \left\vert
          Te^{i\varphi_0} - Re^{i\varphi_1}
        \right\vert^2
  \\& = T^2 + R^2
        - 2TR\cos(\varphi_1-\varphi_0).
  \end{aligned}
$$

![](quantum-info_files/figure-latex/unnamed-chunk-22-1.pdf)<!-- --> 

The "classical" part of this expression, $T^2+R^2$, basically says that the photon undergoes either two consecutive transmissions with probability $T^2$, or two consecutive reflections with probability $R^2$.
The probability of being transmitted through any phase shifter is always $1$, hence the phase shifters play no role in the classical description of this process.
But the classical description is not correct, as the experiments show, whence the interference term $2TR\cos(\varphi_1-\varphi_0)$ in which the phase shifters play the essential role.
Depending on the _relative_ phase $\varphi=\varphi_1-\varphi_0$ the probability that the detector $0$ "clicks" can vary from $(T-R)^2$, for $\varphi=0$, to $1$, for $\varphi=\pi$.

If we do not care about the experimental details, we can represent the action of the Mach--Zehnder interferometer in terms of a diagram: see \@ref(fig:mach-zehnder-diagram).

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/mach-zehnder-diagram-1} 

}

\caption{The Mach-Zehnder interferometer represented as an abstract diagram.}(\#fig:mach-zehnder-diagram)
\end{figure}

Here we can follow, from left to right, the multiple different paths that a photon can take in between specific input and output ports.
The amplitude along any given path is just the product of the amplitudes pertaining to the path segments (Rule 1), while the overall amplitude is the sum of the amplitudes for the many different paths (Rule 2). You can, for example, see that the probability amplitude $U_{10}$ is given by
$$
  U_{10}
  = \sqrt{T}e^{i\varphi_0}i\sqrt{R} + i\sqrt{R}e^{i\varphi_1}\sqrt{T}
$$
and the corresponding probability is
$$
  \begin{aligned}
    P_{10}
    & = \left\vert
        \sqrt{T}e^{i\varphi_0}i\sqrt{R} + i\sqrt{R}e^{i\varphi_1}\sqrt{T}
      \right\vert^2
  \\& = 2RT + 2RT\cos(\varphi_1-\varphi_0).
  \end{aligned}
$$
Again, the first term is of "classical" origin and represents probabilities corresponding to each path: one reflection followed by one transmission plus one transmission followed by one reflection, that is, $RT+TR=2RT$.
The second term is the interference term.
Clearly, the photon entering port $1$ will end up in one of the two detectors, hence,
$$
  P_{00} + P_{10}
  = R^2 + 2RT + T^2
  = (T+R)^2
  = 1.
$$
The action of the interferometer is thus fully described^[In general, any isolated quantum device, including a quantum computer, can be described by a matrix of probability amplitudes $U_{ij}$ that input $j$ generates output $i$. Watch the order of indices.] by the four probability amplitudes $U_{ij}$ ($i,j=0,1$).
The most popular instance of a Mach--Zehnder interferometer involves only symmetric beam-splitters $(R=T=\frac12)$ and is fully described by the matrix
$$
  U =
  \begin{bmatrix}
    -\sin\varphi/2 & \cos\varphi/2
  \\\cos\varphi/2 & \sin\varphi/2
  \end{bmatrix}
$$
where $\varphi=\varphi_1-\varphi_0$.
In fact, when you do all the calculations you obtain $ie^{i\frac{\varphi_0+\varphi_1}{2}}U$ rather than $U$, but the global phase factor $ie^{i\frac{\varphi_0+\varphi_1}{2}}$ is common to all the amplitudes in the matrix and as such it does not contribute to the resulting probabilities.^[Why is this? Hint: think about the eigenvalues of a matrix $A$ and of the matrix $\mu A$, where $\mu$ is a complex number with $|\mu|=1$.]

<!--chapter:end:02-qubits.Rmd-->

# Linking Pauli matrices and the Bloch sphere

:::: {.comment data-latex=""}
::: {.book-only}
[Click here to view this entire chapter on one page.](../tufte/linking-pauli-matrices-and-the-bloch-sphere.html#linking-pauli-matrices-and-the-bloch-sphere)
:::

::: {.tufte-only}
[Click here to view this chapter in the book.](../book/linking-pauli-matrices-and-the-bloch-sphere.html#linking-pauli-matrices-and-the-bloch-sphere)
:::
::::

> More about the Bloch sphere, via the omnipresent Pauli matrices, which can be described in a more algebraic way.

Let us further investigate the relations between single qubit unitary transformations, Pauli matrices, and rotations of regular three-dimensional vectors.
The goal is to be able to visualise sequences of unitary operations on a qubit as sequences of rotations, and to see the action of some quantum circuits without getting engaged in lengthy calculations.

Matrices form a vector space: you can add them, and you can multiply them by a scalar.
One possible choice of a basis in the vector space of $(2\times 2)$ matrices is the set of matrices $\{M_{00},M_{01},M_{10},M_{11}\}$, where the entries of $M_{ij}$ are all $0$ except for the $ij$-th entry, which is $1$.
However, it turns out that there is a different basis which offers lots of insights into the structure of the general single-qubit unitary transformations, namely $\{\id,X,Y,Z\}$, i.e. the identity matrix and the three Pauli matrices.





## The Pauli matrices, algebraically

::: {.idea data-latex=""}
  | $\id$ | $X=\sigma_x$ | $Y=\sigma_y$ | $Z=\sigma_z$ |
  | :-: | :-: | :-: | :-: |
  | $\begin{bmatrix}1&0\\0&1\end{bmatrix}$ | $\begin{bmatrix}0&1\\1&0\end{bmatrix}$ | $\begin{bmatrix}0&-i\\i&0\end{bmatrix}$ | $\begin{bmatrix}1&0\\1&-1\end{bmatrix}$ |
:::

Recalling [Pauli operators], we know that the Pauli operators (as well as the identity operator) are unitary and Hermitian, square to the identity, and anti-commute.

Any $(2\times 2)$ complex matrix $A$ has a unique expansion in the form
\begin{equation}
  \begin{aligned}
    A &=
    \begin{bmatrix}
      a_0 + a_z & a_x - i a_y
    \\a_x +i a_y &  a_0 - a_z
    \end{bmatrix}
  \\&= a_0\id + a_x \sigma_x + a_y \sigma_y + a_z \sigma_z
  \\&= a_0\id + \vec{a}\cdot\vec{\sigma}.
  \end{aligned}
(\#eq:pauli)
\end{equation}
for some complex numbers $a_0$, $a_x$, $a_y$, and $a_z$.
Here, $\vec{a}$ is a vector with three complex components $(a_x, a_y, a_z)$, and $\vec{\sigma}$ represents the "vector" of Pauli matrices $(\sigma_x,\sigma_y,\sigma_z)$.
The algebraic properties of the Pauli matrices can be neatly compacted (see the exercises) into a single expression:

::: {.idea}
  The **multiplication rule**:
  $$
    (\vec{a}\cdot\vec{\sigma})\,(\vec{b}\cdot\vec{\sigma})
    = (\vec{a}\cdot\vec{b})\,\id + i(\vec{a}\times \vec{b})\cdot\vec{\sigma}.
  $$
:::

We also introduce the inner product of two matrices:

::: {.idea}
  The **Hilbert--Schmidt product**:
  $$
    (A|B) = \frac12 \tr A^\dagger B.
  $$
:::

Recall that the trace of a square matrix $A$, denoted by $\tr A$, is defined to be the sum of the elements on the main diagonal of $A$, and defines a linear mapping: for any scalars $\alpha$ and $\beta$,
$$
  \tr (\alpha A+\beta B) = \alpha\tr A +\beta\tr B.
$$
Moreover, the trace is invariant under _cyclic_ permutations: e.g.
$$
  \tr(ABC) = \tr(BCA) = \tr(CAB).
$$
Note, however, that this does _not_ imply that e.g. $\tr(ABC)=\tr(ACB)$.


### Exercises

1. Show that $\{\id,\sigma_x,\sigma_y,\sigma_z\}$ is an orthonormal basis with respect to the Hilbert-Schmidt product in the space of complex $(2\times 2)$ matrices.
2. Show that the coefficients $a_k$ (for $k=x,y,z$) in Equation \@ref(eq:pauli) are given by the inner product $a_k = (\sigma_k|A) = \frac12\tr\sigma_k A$.
3. Show that $\frac12\tr(\vec{a}\cdot\vec{\sigma})(\vec{b}\cdot\vec{\sigma}) = \vec{a}\cdot\vec{b}$.
4. Show that any $\vec{n}\cdot\vec{\sigma}$ has eigenvalues are $\pm|\vec{n}|$.
5. Show that, if $\vec{n}\cdot\vec{m}=0$, then the operators $\vec{n}\cdot\vec{\sigma}$ and $\vec{m}\cdot\vec{\sigma}$ anticommute.
6. In these notes, we usually deal with matrices that are Hermitian ($A=A^\dagger$) or unitary ($AA^\dagger=\id$).
    It is easy to see that, if $A$ is Hermitian, then $a_0$ and the three components of $\vec{a}$ are all real.
    The $(2\times 2)$ unitaries are usually parametrised as
    $$
      U = e^{i\gamma}\Big(u_0\id + i(u_x\sigma_x + u_y\sigma_y + u_z\sigma_z)\Big)
    $$
    where $e^{i\gamma}$ is an overall multiplicative phase factor, with $\gamma$ real, and $u_0$ and the three components $u_x$, $u_y$, $u_z$ are all real numbers.

    Show that the unitarity condition implies that
    $$
      u_0^2 + u_x^2 + u_y^2 + u_z^2 = 1,
    $$
    and show that the determinant of $U$ is $e^{i2\gamma}$ using this parametrisation.






## The Pauli matrices, geometrically

Geometrically speaking, the group of unitaries $\mathrm{U}(2)$ is a three-dimensional sphere $S^3$ in $\mathbb{R}^4$.
We often fix the determinant to be $+1$ and express $(2\times 2)$ unitaries as
$$
  U = u_0\id + i(u_x\sigma_x + u_y\sigma_y + u_z\sigma_z).
$$
Such matrices form a popular subgroup of $\mathrm{U}(2)$; it is called the **special** (meaning the determinant is equal to $1$) unitary group, and denoted by $\mathrm{SU}(2)$.
In quantum theory, any two unitary matrices that differ by some global multiplicative phase factor represent the same physical operation, so we are "allowed to" fix the determinant to be $+1$, and thus restrict ourselves to considering matrices in $\mathrm{SU}(2)$.
This is a sensible approach, practised by many theoretical physicists, but again, for some historical reasons, the convention in quantum information science does not follow this approach.
For example, phase gates are usually written as
$$
  P_\alpha = \diag{1}{e^{i\alpha}}
$$
rather than
$$
  P_\alpha = \diag{e^{-i\frac{\alpha}{2}}}{e^{\,i\frac{\alpha}{2}}}
$$
Still, sometimes the $T$ gate
$$
  T
  = \diag{1}{e^{i\pi/4}}
  = \diag{e^{-i\pi/8}}{e^{i\pi/8}}
$$
is called the $\pi/8$ gate, because of its $\mathrm{SU}(2)$ form.

Let us write any $(2\times 2)$ unitary, up to an overall phase factor, as
$$
  U
  = u_0\id + i(u_x \sigma_x + u_y \sigma_y + u_z \sigma_z)
  = u_0\id + i{\vec{u}}\cdot{\vec{\sigma}}
$$
where $u_0^2+|\vec{u}|^2=1$.
This additional unitarity restriction allows us to parametrise $u_0$ and $\vec{u}$ in terms of a real unit vector $\vec{n}$, parallel to $\vec{u}$, and a real angle $\theta$ so that^[As you can see, we often make progress and gain insights simply by choosing a convenient parametrisation.]
$$
  U
  = (\cos\theta)\id + (i\sin\theta){\vec{n}}\cdot{\vec{\sigma}}.
$$
An alternative way of writing this expression is
$$
  U
  = e^{i\theta {\vec{n}}\cdot{\vec{\sigma}}},
$$
as follows from the power-series expansion of the exponential.
Indeed, any unitary matrix can always be written in the exponential form as
$$
  \begin{aligned}
    e^{iA}
    &\equiv \id + iA + \frac{(i A)^2}{1\cdot 2} + \frac{(i A)^3}{1\cdot 2\cdot 3} \ldots
  \\&= \sum_{n=0}^\infty \frac{(i A)^n}{n!}
  \end{aligned}
$$
where $A$ is a Hermitian matrix.

::: {.idea}
Writing unitary matrices in the form $e^{iA}$ is analogous to writing complex numbers of unit modulus as $e^{i\alpha}$ (the so-called polar form).
:::


### Exercises

1. Show that, if $A^2=\id$, then we can turn the power series expansion into a simple expression: for any real $\alpha$,
    $$
      e^{i\alpha A}
      = (\cos\alpha)\id + (i\sin\alpha)A.
    $$
2. Using the previous exercise, or otherwise, show that any $(2\times 2)$ unitary matrix $U$ can be written, up to an overall multiplicative phase factor, as
    $$
      U
      = e^{i \theta \vec{n}\cdot\vec{\sigma}}
      = (\cos\theta)\id + (i\sin\theta)\vec{n}\cdot\vec{\sigma}.
    $$
    (The argument here is the same as the argument that $e^{i\theta}=\cos\theta +i\sin\theta$).






## Putting the pieces together

Here comes a remarkable connection between two-dimensional unitary matrices and ordinary three-dimensional rotations.

::: {.idea}
The unitary $U = e^{i\theta \vec{n}\cdot\vec{\sigma}}$ represents a clockwise rotation through the angle $2\theta$ about the axis defined by $\vec{n}$.

(N.B. $2\theta$, not $\theta$).
:::

For example,
$$
  \begin{gathered}
    e^{i\theta\sigma_x}
    =
    \begin{bmatrix}
      \cos\theta & i\sin\theta
    \\i\sin\theta & \cos\theta
    \end{bmatrix}
    \qquad
    e^{i\theta\sigma_y}
    =
    \begin{bmatrix}
      \cos\theta & \sin\theta
    \\-\sin\theta & \cos\theta
    \end{bmatrix}
  \\e^{i\theta\sigma_z}
    = \diag{e^{i\theta}}{e^{-i\theta}}
  \end{gathered}
$$
represent rotations by $2\theta$ about the $x$-, $y$- and $z$-axis, respectively.

(ref:exponential-rotation-caption) $e^{i\theta\vec{n}\cdot\vec{\sigma}}$ rotates the vector $\vec{s}$ about $\vec{n}$ by angle $2\theta$, sending it to a point on the blue circle, whose centre is passed through by $\vec{n}$.

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/unnamed-chunk-23-1} 

}

\caption{(ref:exponential-rotation-caption)}(\#fig:unnamed-chunk-23)
\end{figure}

The Hadamard gate
$$
  \begin{aligned}
    H
    &= \frac{1}{\sqrt 2}
    \begin{bmatrix}
      1& 1
    \\1 & -1
    \end{bmatrix}
  \\&= \frac{1}{\sqrt 2}(\sigma_x + \sigma_z)
  \\&= (-i)e^{i \frac{\pi}{2} \frac{1}{\sqrt 2}(\sigma_x+\sigma_z)}
  \end{aligned}
$$
(which, up to the overall multiplicative phase factor of $-i$, is equal to $e^{i \frac{\pi}{2} \frac{1}{\sqrt 2}(\sigma_x+\sigma_z)}$) represents rotation about the diagonal $(x+z)$-axis through the angle $\pi$.

In somewhat abstract terms, we make the connection between unitaries and rotations by looking how the unitary group $\mathrm{U}(2)$ acts on the three-dimensional Euclidian space of $(2\times 2)$ Hermitian matrices _with zero trace_.
All such matrices $S$ can be written as $S=\vec{s}\cdot\vec{\sigma}$ for some real $\vec{s}$, i.e. each matrix is represented by a Euclidean vector $\vec{s}$ in $\mathbb{R}^3$.
Now, $U\in \mathrm{U}(2)$ acts on the Euclidean space of such matrices by $S\mapsto S' = USU^\dagger$, i.e.
\begin{equation}
  \vec{s}\cdot\vec{\sigma}
  \mapsto
  \vec{s'}\cdot\vec{\sigma}
  = U(\vec{s}\cdot\vec{\sigma})U^\dagger
(\#eq:u2so3map)
\end{equation}
This is a linear map $\mathbb{R}^3\to\mathbb{R}^3$, and is thus given by some $(3\times 3)$ real-valued matrix $R$.
We note that this map is an isometry (a distance preserving operation), since it preserves the scalar product in the Euclidean space: for any two vectors $\vec{s}$ and $\vec{v}$,
$$
  \begin{aligned}
    \vec{s'}\cdot\vec{v'}
    &= \frac12\tr [S'V']
  \\&= \frac12\tr [(USU^\dagger)(UVU^\dagger)]
  \\&= \frac12\tr [SV]
  \\&= \vec{s}\cdot\vec{v}
  \end{aligned}
$$
(where $S=\vec{s}\cdot\vec{\sigma}$ and $V=\vec{v}\cdot\vec{\sigma}$), using the cyclic property of the trace.
This means that matrix $R$ is _orthogonal_.^[Orthogonal transformations preserve the length of vectors as well as the angles between them.]
Furthermore, we can show^[One can also infer that $\det R=1$ from the fact that any matrix in $\mathrm{U}(2)$ can be smoothly connected to the identity.] that $\det R=1$.
The only isometries in three dimensional Euclidian space, which are described by orthogonal matrices $R$ with $\det R=1$, are rotations.
Thus, in the mathematical lingo, we have established a homomorphism^[Recall that a homomorphism is a structure-preserving map between two algebraic structures of the same type, in our case two groups. An isomorphism between algebraic structures of the same type is one-to-one homomorphism.] between $\mathrm{U}(2)$ and $\mathrm{SO}(3)$, where $\mathrm{SO}(3)$ stands for the special orthogonal group in three dimensions (the group of all rotations about the origin of three-dimensional Euclidean space $\mathbb{R}^3$ under the operation of composition).
It is quite clear from Equation \@ref(eq:u2so3map) that unitary matrices differing only by a global multiplicative phase factor (e.g. $U$ and $e^{i\gamma}U$) represent the same rotation.

Physicists, however, usually prefer a more direct demonstration, which goes roughly like this.
Consider the map $\vec{s} \mapsto \vec{s'}$ induced by $U=e^{i \alpha \vec{n}\cdot\vec{\sigma}}$.
For small values of $\alpha$, we can write
$$
  \begin{aligned}
    \vec{s'}\cdot\vec{\sigma}
    &= U(\vec{s}\cdot\vec{\sigma}) U^\dagger
  \\&= \Big(
      \id +i\alpha (\vec{n}\cdot\vec{\sigma})+\ldots
    \Big)
    (\vec{s}\cdot\vec{\sigma}) 
    \Big(
      \id - i\alpha(\vec{n}\cdot\vec{\sigma})+\ldots
    \Big).
  \end{aligned}
$$
To the first order in $\alpha$, this gives
$$
  \begin{gathered}
    \vec{s'} \cdot\vec{\sigma}
    = \Big(
      \vec{s} + 2\alpha (\vec{n}\times\vec{s})
    \Big)
    \cdot \vec{\sigma}
  \\\mbox{i.e.}
    \quad
    \vec{s'} =
    \vec{s} + 2\alpha(\vec{n}\times\vec{s})
  \end{gathered}
$$
which we recognise as a good old textbook formula for an infinitesimal clockwise rotation of $\vec{s}$ about the axis $\vec{n}$ through the angle $2\alpha$.


### Exercises

1. Show that $\tr \sigma_x\sigma_y\sigma_z = 2i$.





## Universality, again





## Some quantum dynamics

<!--chapter:end:03-pauli-bloch.Rmd-->

# Measurements

<!--chapter:end:04-measurement.Rmd-->

# Quantum entanglement

<!--chapter:end:05-entanglement.Rmd-->

# Quantum algorithms

<!--chapter:end:06-algorithms.Rmd-->

# (PART) Part 2 {-} 

# Bell's theorem

:::: {.comment data-latex=""}
::: {.book-only}
[Click here to view this entire chapter on one page.](../tufte/bells-theorem.html#bells-theorem)
:::

::: {.tufte-only}
[Click here to view this chapter in the book.](../book/bells-theorem.html#bells-theorem)
:::
::::

> About quantum correlations, which are stronger than any correlations allowed by classical physics, and about the [CHSH inequality](https://en.wikipedia.org/wiki/CHSH_inequality) which demonstrates this fact.





## Quantum correlations

Consider two entangled qubits in the singlet state
$$
  \ket{\psi}
  = \frac{1}{\sqrt 2} \left( \ket{01}-\ket{10} \right)
$$
and note that the projector $\proj{\psi}$ can be written as^[There are other, more elementary, ways of deriving this result but here I want you to hone your skills. Now that you've learned about projectors, traces, and Pauli operators, why not put them to good use.]
$$
  \proj{\psi}
  = \frac{1}{4} \left(
    \id\otimes\id - \sigma_x\otimes\sigma_x - \sigma_y\otimes\sigma_y - \sigma_z\otimes \sigma_z
  \right).
$$
Any single qubit observable with values $\pm 1$ can be represented by the operator
$$
  \vec{a}\cdot\vec\sigma
  = a_x\sigma_x + a_y\sigma_y + a_z\sigma_z,
$$
where $\vec{a}$ is a unit vector in the three-dimensional Euclidean space.
Suppose Alice and Bob choose measurements defined by vectors $\vec{a}$ and $\vec{b}$, respectively.
For example, if the two qubits are spin-half particles, they may measure the spin components along the directions $\vec{a}$ and $\vec{b}$.
We write the corresponding observable as the tensor product
$$
  A\otimes B
  = (\vec{a}\cdot\vec\sigma)\otimes(\vec{b}\cdot\vec\sigma).
$$
The eigenvalues of $A\otimes B$ are the products of eigenvalues of $A$ and $B$.
Thus $A\otimes B$ has two eigenvalues: $+1$, corresponding to the instances when Alice and Bob registered identical outcomes, i.e. $(+1,+1)$ or $(-1,-1)$; and $-1$, corresponding to the instances when Alice and Bob registered different outcomes, i.e. $(+1,-1)$ or $(-1,-1)$.
This means that the expected value of $A\otimes B$, in any state, has a simple interpretation:
$$
    \av{A\otimes B} = \Pr (\text{outcomes are the same}) - \Pr (\text{outcomes are different}).
$$
This expression can take any numerical value from $-1$ (perfect anti-correlations) through $0$ (no correlations) to $+1$ (perfect correlations).
We now evaluate the expectation value in the singlet state:
$$
\begin{aligned}
  \bra{\psi}A\otimes B\ket{\psi}
  & = \tr\left[
      (\vec{a}\cdot\vec\sigma)\otimes(\vec{b}\cdot\vec\sigma) \proj{\psi}
    \right]
\\& = -\frac{1}{4} \tr\left[
      (\vec{a}\cdot\vec\sigma)\sigma_x \otimes(\vec{a}\cdot\vec\sigma)\sigma_x
      + (\vec{a}\cdot\vec\sigma)\sigma_y \otimes(\vec{a}\cdot\vec\sigma)\sigma_y
      + (\vec{a}\cdot\vec\sigma)\sigma_z \otimes(\vec{a}\cdot\vec\sigma)\sigma_z
    \right]
\\& = -\frac{1}{4} \tr\left[
      (a_x b_x + a_y b_y + a_z b_z) \id\otimes\id
    \right]
\\& = -\vec{a}\cdot\vec{b}
\end{aligned}
$$
where we have used the fact that $\tr(\vec{a}\cdot\vec\sigma)\sigma_k = a_k$ ($k=x,y,z$).
So if Alice and Bob choose the same observable, $\vec{a} = \vec{b}$, then their outcomes will be always opposite: whenever Alice registers $+1$ (resp. $-1$) Bob is bound to register $-1$ (resp. $+1$).





## Hidden variables

The story of "hidden variables" dates back to 1935 and grew out of Einstein's worries about the completeness of quantum theory.
Consider, for example, a qubit.
No quantum state of a qubit can be an eigenstate of two non-commuting operators, say $\sigma_x$ and $\sigma_z$.
If the qubit has a definite value of $\sigma_x$ its value of $\sigma_z$ must be indeterminate, and vice versa.
If we take quantum theory to be a complete description of the world, then we must accept that it is impossible for both $\sigma_x$ and $\sigma_z$ to have definite values for the same qubit at the same time.
Einstein felt very uncomfortable about all this.
He argued that quantum theory is incomplete, and that observables $\sigma_x$ and $\sigma_z$ may both have simultaneous definite values, although we only have knowledge of one of them at a time.
This is the hypothesis of **hidden variables**.
In this view, the indeterminacy found in quantum theory is merely due to our ignorance of these "hidden variables" that are present in nature but not accounted for in the theory.
Einstein came up with a number of pretty good arguments for the existence of "hidden variables".
Probably the most compelling one was described in his 1935 paper (known as the EPR paper), co-authored with his younger colleagues, Boris Podolsky and Nathan Rosen.
It stood for almost three decades as the most significant challenge to the completeness of quantum theory.
Then, in 1964, John Bell showed that the hidden variable hypothesis can be tested and refuted.





## CHSH inequality

> Upper bound on **classical** correlations.

I will describe the most popular version of Bell's argument, introduced in 1969 by John Clauser, Michael Horne, Abner Shimony, and Richard Holt (CHSH).
Let us assume that the results of any measurement on any individual system are predetermined.
Any probabilities we may use to describe the system merely reflect our ignorance of these hidden variables.

Now, imagine the following scenario.
Alice and Bob, two characters with a predilection for wacky experiments, are equipped with appropriate measuring devices and sent to two distant locations.
Somewhere in between them there is a source that emits pairs of qubits that fly apart, one towards Alice and one towards Bob.
Let us label the two qubits in each pair as $\mathcal{A}$ and $\mathcal{B}$ respectively, and let us assume that both Alice and Bob have well defined values of their observables.
We ask Alice and Bob to measure one of the two pre-agreed observables.
For each incoming qubit, Alice and Bob choose randomly, and independently from each other, which particular observable will be measured.
Alice chooses between $A_1$ and $A_2$, and Bob between $B_1$ and $B_2$.
Each observable has value $+1$ or $-1$, and so we are allowed to think about them as random variables $A_k$ and $B_k$, for $k=1,2$, which take values $\pm 1$.
Let us define a new random variable, the **CHSH quantity** $S$, as
$$
  S = A_1(B_1 - B_2) + A_2(B_1 + B_2).
$$
It is easy to see that one of the terms $B_1\pm B_2$ must be equal to zero and the other to $\pm 2$, hence $S=\pm2$.
The average value of $S$ must lie somewhere in-between, i.e.
$$
  -2 < \av{S} < 2.
$$
That's it!
Such a simple and yet profound mathematical statement about correlations, which we refer simply to as the **CHSH inequality**.
No quantum theory is involved because the CHSH inequality is not specific to quantum theory: it does not really matter what kind of physical process is behind the appearance of binary values of $A_1$, $A_2$, $B_1$, and $B_2$; it is a statement about correlations, and for all classical correlations we must have
$$
  |
    \av{A_1 B_1} - \av{A_1 B_2} + \av{A_2 B_1} + \av{A_2 B_2}
  | < 2.
$$

There are essentially two two assumptions here:

1. **Hidden variables.** Observables have definite values
2. **Locality.** Alice's choice of measurements ($A_1$  or $A_2$) does not affect the outcomes of Bob's measurement, and vice versa.

I will not discuss the locality assumption here in detail but let me comment on it briefly.
In the hidden variable world a, statement such as  "if Bob were to measure $B_1$ then he would register $+1$" must be either true or false _prior to Bob's measurement_.
Without the locality hypothesis, such a statement is ambiguous, since the value of $B_1$ could depend on whether $A_1$ or $A_2$ will be chosen by Alice.
We do not want this for it implies the instantaneous communication.
It means that, say, Alice by making a choice between $A_1$ and $A_2$, affects Bob's results.
Bob can immediately "see" what Alice "does".





## Quantum correlations revisited

In quantum theory the observables $A_1$, $A_2$, $B_1$, $B_2$ become $2\times 2$ Hermitian matrices with two eigenvalues $\pm 1$, and $\av{S}$ becomes the expected value of the $(4\times 4)$ **CHSH matrix**
$$
  S
  = A_1\otimes(B_1-B_2) + A_2\otimes(B_1+B_2).
$$

We can now evaluate $\av{S}$ using quantum theory.
For example, if the two qubits are in the singlet state, then we know that
\[
  \av{A\otimes B} = -\vec{a}\cdot\vec{b}.
\]
We choose vectors $\vec{a}_1$, $\vec{a}_2$, $\vec{b}_1$, and $\vec{b}_2$ as shown in Figure \@ref(fig:choice-of-as-and-bs), and then, with these choices,
$$
\begin{gathered}
  \av{A_1\otimes B_1}
  = \av{A_2\otimes B_1}
  = \av{A_2\otimes B_2}
  = \frac{1}{\sqrt 2}
\\\av{A_1\otimes B_2}
   = -\frac{1}{\sqrt 2}.
\end{gathered}
$$

(ref:choice-of-as-and-bs-caption) The relative angle between the two perpendicular pairs is $45^\circ$.

![(\#fig:choice-of-as-and-bs)(ref:choice-of-as-and-bs-caption)](quantum-info_files/figure-latex/choice-of-as-and-bs-1.pdf) 

Thus
$$
  \av{A_1 B_1} - \av{A_1 B_2} + \av{A_2 B_1} + \av{A_2 B_2}
  = -2\sqrt{2},
$$
which obviously violates CHSH inequality.

To be clear, this violation has been observed in a number of painstakingly careful experiments.
The early efforts were truly heroic, and the experiments had many layers of complexity.
Today, however, such experiments are routine.

::: {.idea data-latex=""}
  **Motto.** The behaviour of entangled quantum systems cannot be explained by any local hidden variables.
:::





## Tsirelson's inequality

> Upper bound on **quantum** correlations.

One may ask (and indeed one of you did ask) if $|\av{S}|= 2\sqrt{2}$ is the maximal violation of the CHSH inequality, and yes, it is: quantum correlations cannot achieve any value of $|\av{S}|$ larger than $2\sqrt{2}$.
This is because, for any state $\ket{\psi}$, the expected value $\av{S} = \braket{\psi|S|\psi}$ cannot exceed the largest eigenvalue of $S$, and we can put an upper bound on the largest eigenvalues of $S$.
To start with, the largest eigenvalue (in absolute value) of a Hermitian matrix $M$, denoted by $\|M\|$, is a matrix norm, and it has the following properties:
$$
\begin{aligned}
  \|M\otimes N\|
  & = \|M\| \|N\|
\\\|MN\|
  & \leq \|M\| \|N\|
\\\|M+N\|
  & \leq \|M\| + \|N\|
\end{aligned}
$$
Given that $\|A_i\|=1$ and $\|B_j\|=1$ ($i,j=1,2$), it is easy to show that $\|S\| < 4$.
One can, however, derive a tighter bound.
We can show (do it) that
$$
  S^2
  = 4(\id\otimes\id) + [A_1,A_2]\otimes[B_1,B_2].
$$
The norm of each of the commutators ($\|[A_1, A_2]\|$ and $\|[B_1, B_2]\|$) cannot exceed $2$, and $\|S^2\|=\|S\|^2$, which all together gives
$$
  \|S\|
  < 2\sqrt{2}
  \implies
  |\av{S}| < 2\sqrt{2}.
$$
This result is known as the **Tsirelson inequality**.

<!--chapter:end:07-EPR-bell.Rmd-->

# Decoherence, and elements of quantum error correction

:::: {.comment data-latex=""}
::: {.book-only}
[Click here to view this entire chapter on one page.](../tufte/decoherence-and-elements-of-quantum-error-correction.html#decoherence-and-elements-of-quantum-error-correction)
:::

::: {.tufte-only}
[Click here to view this chapter in the book.](../book/decoherence-and-elements-of-quantum-error-correction.html#decoherence-and-elements-of-quantum-error-correction)
:::
::::

> On ... **!!!TODO!!!**

In principle we know how to build a quantum computer: we can start with simple quantum logic gates and try to integrate them together into quantum networks.
However, if we keep on putting quantum gates together into networks we will quickly run into some serious practical problems.
The more interacting qubits involved, the harder it is to prevent them from getting entangled with the environment.
This unwelcome entanglement, also known as **decoherence**, destroys the interference, and thus the power, of quantum computing.





## Decoherence simplified

Consider the following qubit-environment interaction:
$$
  \begin{aligned}
    \ket{0}\ket{e} &\longmapsto \ket{0}\ket{e_{00}}
  \\\ket{1}\ket{e} &\longmapsto \ket{1}\ket{e_{11}}
  \end{aligned}
$$
where $\ket{e}$, $\ket{e_{00}}$, and $\ket{e_{11}}$ are the states of the environment, which not need to be orthogonal.^[The reason we use two indices in $\ket{e_{00}}$ and $\ket{e_{11}}$ will become clear in a moment, when we consider more general interaction with the environment.]
Let $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$ be the initial state of the qubit.
The environment is essentially trying to _measure_ the qubit and, as the result, the two get entangled:
$$
  \Big( \alpha\ket{0} + \beta\ket{1} \Big) \ket{e}
  \longmapsto
  \alpha \ket{0}\ket{e_{00}} + \beta \ket{1} \ket{e_{11}}.
$$
This state can also be written as
$$
  \begin{aligned}
    \Big( \alpha\ket{0} + \beta\ket{1} \Big) \ket{e}
    \longmapsto
    & \Big( \alpha\ket{0} + \beta\ket{1} \Big) \frac{\ket{e_{00}}+\ket{e_{11}}}{2}
  \\+& \Big( \alpha\ket{0} - \beta\ket{1} \Big) \frac{\ket{e_{00}}-\ket{e_{11}}}{2}.
  \end{aligned}
$$
or as
$$
  \ket{\psi}\ket{e}
  \longmapsto
  \id\ket{\psi}\ket{e_1} + Z\ket{\psi}\ket{e_z},
$$
where $\ket{e_1} = \frac12(\ket{e_{00}} + \ket{e_{11}})$ and $\ket{e_z} = \frac12(\ket{e_{00}} - \ket{e_{11}})$.
We may interpret this expression by saying that two things can happen to the qubit: nothing $\id$ (first term), or phase-flip $Z$ (second term).
This, however, should not be taken literally unless the states of the environment, $\ket{e_1}$ and $\ket{e_z}$, are orthogonal.^[Why not?]





## Decoherence and interference

Suppose the qubit undergoes the usual interference experiment but in between the two Hadamard gates it is affected by decoherence (denoted by $\times$).

\begin{figure}[H]

{\centering \includegraphics{quantum-info_files/figure-latex/decoherence-interference-1} 

}

\caption{The usual interference experiment, but with decoherence.}(\#fig:decoherence-interference)
\end{figure}

Let us step through the circuit in Figure \@ref(fig:decoherence-interference), keeping track of the state of the environment:
$$
  \begin{aligned}
    \ket{0}\ket{e}
    & \xmapsto{H} \Big( \ket{0} + \ket{1} \Big) \ket{e}
  \\& \xmapsto{\phi} \Big( \ket{0} + e^{i\phi}\ket{1} \Big) \ket{e}
  \\& \xmapsto{\times} \ket{0}\ket{e_0} + e^{i\phi}\ket{1}\ket{e_1}
  \\& \xmapsto{H} \ket{0}\Big( \ket{e_{00}} + e^{i\phi}\ket{e_{11}} \Big) + \ket{1}\Big( \ket{e_{00}} - e^{i\phi}\ket{e_{11}} \Big).
  \end{aligned}
$$
If we write $\braket{e_0|e_1} = ve^{i\alpha}$, then the final probabilities of $0$ and $1$ oscillate with $\phi$ as
$$
  \begin{aligned}
    P_{0}(\phi) &= \frac12\big(1 + v\cos(\phi + \alpha)\big),
  \\P_{1}(\phi) &= \frac12\big(1 - v\cos(\phi + \alpha)\big).
  \end{aligned}
$$

![(\#fig:visibility-suppression)Visibility suppression.](quantum-info_files/figure-latex/visibility-suppression-1.pdf) 

As we can see in Figure \@ref(fig:visibility-suppression), the interference pattern is suppressed by a factor $v$, which we call the **visibility**.
As $v=|\!\braket{e_0|e_1}\!|$ decreases, we lose all the advantages of quantum interference.
For example, in Deutsch's algorithm we obtain the correct answer with probability at most $(1+v)/2$.
For $\braket{e_0|e_1} = 0$, the perfect decoherence case, the network outputs $0$ or $1$ with equal probabilities, i.e. it is _useless_ as a computing device.

::: {.idea data-latex=""}
  It is clear that we want to avoid decoherence, or at least diminish its impact on our computing device.
  For this we need **quantum error correction**: we encode the state of a single (logical) qubit across several (physical) qubits.
:::





## Evolution of density operators under decoherence

In terms of density operators, the qubit alone evolves from the pure state $\proj{\psi}$ to a mixed state, which can be obtained by tracing over the environment.
We start with the evolution of the state vector $\ket{\psi}=\alpha\ket{0}+\beta\ket{1}$, which is given by
$$
  \left( \alpha\ket{0} +\beta \ket{1}\right)\ket{e} \longmapsto
  \alpha \ket{0}\ket{e_{00}} +\beta \ket{1} \ket{e_{11}},
$$
Then we write it as the evolution of the projector $\proj{\psi}$, and trace over the environment to obtain
$$
  \begin{aligned}
    \proj{\psi} \longmapsto & |\alpha|^2\proj{0} \braket{e_{00}|e_{00}}+ \alpha\beta^\star \ket{0}\!\bra{1}\braket{e_{11}|e_{00}}
  \\+ &\alpha^\star\beta \ket{1}\!\bra{0}\braket{e_{00}|e_{11}}  + |\beta|^2\proj{1}\braket{e_{11}|e_{11}}.
  \end{aligned}
$$
Written in the matrix form, this is
$$
  \begin{bmatrix}
    |\alpha|^2 & \alpha\beta^\ast
  \\\alpha^\ast\beta & |\beta|^2
  \end{bmatrix}
  \longmapsto
  \begin{bmatrix}
    |\alpha|^2 & \alpha\beta^\ast \braket{e_{11}|e_{00}}
    \\\alpha^\ast\beta \braket{e_{00}|e_{11}} & |\beta|^2
  \end{bmatrix}.
$$
The off-diagonal elements, originally called **coherences**, vanish as $\braket{e_0|e_1}$ approaches zero.
This is why this particular interaction is called decoherence.

Notice that
$$
\ket{\psi}\ket{e} \longmapsto \id \ket{\psi}\ket{e_1} +Z\ket{\psi}\ket{e_z},
$$
implies
$$
\proj{\psi}\longmapsto \id \proj{\psi} \id \braket{e_1|e_1} +Z\proj{\psi} Z\braket{e_z|e_z},
$$
_only_ when $\braket{e_1|e_z}=0$ (otherwise you would have additional cross terms $\id\proj{\psi} Z$  and $Z\proj{\psi} \id$).
In this case we can indeed say that, with probability $\braket{e_1|e_1}$, nothing happens, and, with probability $\braket{e_z|e_z}$, the qubit undergoes the phase-flip $Z$.





## Quantum errors

The most general qubit-environment interaction
$$
  \begin{aligned}
    \ket{0}\ket{e} &\longmapsto \ket{0}\ket{e_{00}} + \ket{1}\ket{e_{01}},
  \\\ket{1}\ket{e} &\longmapsto \ket{1}\ket{e_{10}} + \ket{0}\ket{e_{11}},
  \end{aligned}
$$
where the states of the environment are neither normalised nor orthogonal, leads to decoherence
$$
  \begin{aligned}
    \Big( \alpha\ket{0} + \beta\ket{1} \Big) \ket{e} \longmapsto
    & \Big( \alpha\ket{0} + \beta\ket{1} \Big) \frac{\ket{e_{00}}+\ket{e_{11}}}{2}
  \\+& \Big( \alpha\ket{0} - \beta\ket{1} \Big) \frac{\ket{e_{00}}-\ket{e_{11}}}{2}
  \\+& \Big( \alpha\ket{1} + \beta\ket{0} \Big) \frac{\ket{e_{01}}+\ket{e_{10}}}{2}
  \\+& \Big( \alpha\ket{1} - \beta\ket{0} \Big) \frac{\ket{e_{01}}-\ket{e_{10}}}{2}.
  \end{aligned}
$$
We can also write this as
$$
\ket{\psi}\ket{e} \longmapsto  \id \ket{\psi}\ket{e_1} + Z\ket{\psi} \ket{e_z} +X\ket{\psi} \ket{e_x} + Y\ket{\psi} \ket{e_y}.
$$
The intuition behind this expression is that four things can happen to the qubit:

1. nothing ($\id$),
2. phase-flip ($Z$),
3. bit-flip ($X$), or
4. both bit-flip and phase-flip ($Y$).

This is certainly the case when the states $\ket{e_1}, \ket{e_x}, \ket{e_y}$ and $\ket{e_z}$ are mutually orthogonal, otherwise we cannot perfectly distinguish between the four alternatives.

::: {.idea data-latex=""}
  What is important here is the discretisation of errors, and the fact that we can reduce quantum errors to _two types_: bit-flip errors $X$, and phase-flip errors $Z$.
:::

In general, given $n$ qubits in state $\ket{\psi}$ and the environment in state $\ket{e}$ the joint evolution can be expanded as
$$
\ket{\psi}\ket{e} \longmapsto \sum_i E_i\ket{\psi}\ket{e_i},
$$
where the $E_i$ are the $n$-fold tensor products of the Pauli operators and the $\ket{e_i}$ are the corresponding states of the environment, which are not assumed to be normalised or mutually orthogonal.
A typical operator $E_i$ acting on five qubits may look like this,
$$
  X\otimes Z \otimes \id \otimes \id \otimes Y
  \equiv XZ\id\id Y.
$$
We can say that $E_i$ represents an error consisting of the bit ($X$) error on the first qubit, phase ($Z$) error on the second qubit and both bit and phase ($Y$) error on the fifth qubit.
Again, _this is not quite accurate if the corresponding states of the environment are not mutually orthogonal_, but it gives the right kind of intuition nonetheless.
Here the index $i$ in $E_i$ ranges from $1$ to $4^5=1024$, because there are $4^5$ different Pauli operators acting on $5$ qubits.





## Same evolution, different errors

We can always pick up an orthonormal basis $\ket{u_i}$ in the environment and express the system--environment evolution as
$$
  \begin{aligned}
    \ket{\psi}\ket{e}
    \longmapsto &\sum_{ij} E_i\ket{\psi}\ket{u_j}\braket{u_j|e_i}
    \\&= \sum_{j}\Big( \sum_i \braket{u_j|e_i} E_i\Big)\ket{\psi}\ket{u_j}
    \\&= \sum_j M_j\ket{\psi}\ket{u_j}.
  \end{aligned}
$$
The new "error" operators $M_j$ satisfy $\sum_j M_j^\dagger M_j =\id$ and, in general, they are _not_ unitary.
Now, the evolution of the density operator $\proj{\psi}$ can be written as 
$$
  \proj{\psi}\longmapsto \sum_j M_j\proj{\psi} M_j^\dagger.
$$
Which particular errors you choose depends of your choice of the basis in the environment.
If, instead of $\ket{u_j}$, you pick up a different basis, say $\ket{v_k}$, then
$$
  \begin{aligned}
    \ket{\psi}\ket{e}
    \longmapsto &\sum_j M_j\ket{\psi}\ket{u_j}
  \\&= \sum_j M_j \ket{\psi}\sum_k\ket{v_k}\braket{v_k|u_j}
  \\&= \sum_k \Big(\sum_j \braket{v_k|u_j} M_j \Big)\ket{\psi}\ket{v_k}
  \\&= \sum_k N_k\ket{\psi}\ket{v_k},
  \end{aligned}
$$
and, consequently,
$$
  \proj{\psi}\longmapsto \sum_k N_k\proj{\psi} N_k^\dagger.
$$
The new "errors" satisfy $\sum_k N_k^\dagger N_k = \id$, and the error operators $N_k$ and $M_j$ are related by the unitary matrix $U_{kj}=\braket{v_k|u_j}$. 





## Some errors can be corrected on some states

Alice prepares a quantum object in some state $\ket{\psi}$ and sends it to Bob.
The object is intercepted by a malicious Eve who changes its state by applying one of the prescribed unitary operations $U_1,\ldots, U_n$, with probabilities $p_1,\ldots, p_n$, respectively.
Alice and Bob know the set of possible unitaries (errors), and the associated probabilities, but they do not know which particular unitary operation was chosen by Eve.
Can Bob reconstruct the state $\ket{\psi}$?
The answer is affirmative, at least for _some states_ $\ket{\psi}$.

Let $\mathcal{H}$ be the Hilbert space pertaining to the object, and let $\mathcal{C}$ be a subspace of $\mathcal{H}$.
Suppose $\ket{\psi}\in\mathcal{C}$, and that, for each vector in $\mathcal{C}$, we have
$$
  \bra{\psi}U^\dagger_i U_j\ket{\psi} = \delta_{ij}
$$
Any error $U_k$ transforms the subspace $\mathcal{C}$ into the subspace $\mathcal{C}_k$, which is orthogonal to $\mathcal{C}$ and also to any other subspace $\mathcal{C}_j$ for $j\neq k$.
All Bob has to do is
- perform a measurement, defined by projectors on the subspaces $\mathcal{C}_j$ for $j=1,\ldots n$,
- identify $k$, and
- apply $U_k^\dagger$.

As an example, consider an object composed of three qubits and the subspace $\mathcal{C}$ spanned by the two basis vectors $\ket{000}$ and $\ket{111}$.
Suppose Eve applies one of the following four unitary operations: $U_0=\id\otimes\id\otimes \id$, $U_1 =X\otimes\id\otimes \id$, $U_2 =\id \otimes X\otimes \id$, and $U_3=\id\otimes\id\otimes X$.
That is, the identity, or bit-flip on the first, second, or third qubit.
Each operation is chosen randomly with the same probability of $1/4$.
It is easy to see that the four operations generate four subspaces:
$$
  \begin{aligned}
    \mathcal{C} = \Big\langle\ket{000},\ket{111}\Big\rangle &\qquad \mathcal{C}_1 = \Big\langle\ket{100},\ket{011}\Big\rangle
  \\\mathcal{C}_2 = \Big\langle\ket{010},\ket{101}\Big\rangle& \qquad \mathcal{C}_3 = \Big\langle\ket{001},\ket{110}\Big\rangle.
  \end{aligned}
$$
The eight dimensional Hilbert space of the three qubits is then decomposed into the sum of orthogonal subspaces
$$
\mathcal{C} \oplus \mathcal{C}_1 \oplus\mathcal{C}_2 \oplus \mathcal{C}_3
$$
So suppose Alice prepares $\ket{\psi}=\alpha\ket{000}+\beta\ket{111}$ and Eve applies the bit-flip to the third qubit.
This generates the state $\id\otimes\id\otimes X\ket{\psi}=\alpha\ket{001}+\beta\ket{110}\in \mathcal{C}_3$.
The projective measurement on these subspaces tells Bob that the new state is in the subspace $\mathcal{C}_3$, and hence the original state can be recovered by the operation $\id\otimes\id\otimes X$.





## Repetition codes

In order to give a sense of how quantum error correction actually works, let us begin with a _classical_ example of a repetition code.
Suppose a transmission channel flips each bit in transit with probability $p$.
If this error rate is considered too high then it can be decreased by encoding each bit into, say, three bits:
$$
  \begin{aligned}
    0 &\mapsto 000
  \\1 &\mapsto 111.
  \end{aligned}
$$
That is, each time we want to send logical $0$, we send three physical bits, all in state $0$; each time we want to send logical $1$, we send three physical bits, all in state $1$.
The receiver decodes the bit value by a "majority vote" of the three bits.
If only one error occurs, then this error correction procedure is foolproof.
In general, the net probability of error is just the likelihood that two or three errors occur, which is $3p^2(1-p) + p^3 < p$.
Thus the three bit code improves the reliability of the information transfer.
The _quantum_ case, however, is more complicated, because we have both bit-flip _and_ phase-flip errors.





## Quantum error correction

In order to protect a qubit against bit-flips (incoherent $X$ rotations), we rely on the same repetition code, but both encoding and error correction is now done by quantum operations.
We take a qubit in some unknown pure state $\alpha\ket{0} + \beta\ket{1}$, introduce two auxiliary qubits, and encode it into three qubits as


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-24-1} \end{center}

Suppose that at most one qubit is then flipped (say, the second one).
The encoded state then becomes $\alpha\ket{010} + \beta\ket{101}$.
Decoding requires some care: if we measure the three qubits directly it would destroy the superposition of states that we are working so hard to protect.
Instead we introduce another two additional qubits, both in state $\ket{0}$, and apply the following network:


\begin{center}\includegraphics{quantum-info_files/figure-latex/unnamed-chunk-25-1} \end{center}

We measure the two auxiliary qubits, also known as **ancilla bits**, and the result of the measurement, known as the **error syndrome**, tells us how to reset the three qubits of the code.
The theory behind this network runs as follows.

If qubits one and two (counting from the top) are the same, then the first ancilla is in the $\ket{0}$ state.
Similarly, if qubits two and three are the same, then the second ancilla is in the $\ket{0}$ state.
However, if they are different, then the corresponding ancilla is in the $\ket{1}$ state.
Hence, the four possible error syndromes --- $\ket{00}$, $\ket{01}$, $\ket{10}$, and $\ket{11}$ --- each indicate a different possibility: no errors, an error in the third, first, or second qubits (respectively).
In our example, we would measure $\ket{11}$, revealing that both qubits 1 and 2, and qubits 2 and 3, are different.
Thus it is qubit 2 that has an error.
Knowing the error, we can go back and fix it, simply by applying $X$ to qubit 2.
The net result is the state $\alpha\ket{000} + \beta\ket{111}$, which is then turned into $(\alpha\ket{0} + \beta\ket{1})\ket{0}\ket{0}$ by running the mirror image of the encoding network.





## Turning bit-flips into phase-flips

The three-qubit code that we have just demonstrated is sufficient to protect a qubit against single bit-flips, but not phase-flips.
But this is good enough.
Recall that $HZH=X$, and so it is enough to sandwich the decoherence area in between the Hadamard gates: they will turn phase flips into bit flips, and we already know hot to protect our qubits against $Z$-errors.
The encoded state $\alpha\ket{0} + \beta\ket{1}$ now reads $\alpha\ket{+++}+\beta\ket{---}$, where $\ket{\pm}=\ket{0}\pm\ket{1}$.





## Dealing with bit-flip and phase-flip errors

We can now put the bit-flip and phase-flip codes together: first we encode the qubit using the phase-flip code, and then we encode each of the three qubits of the code using the bit-flip code.
This gives an error correction scheme that allows us to protect against both types of error, thus yielding a code that encodes a single logical qubit across nine physical qubits, protecting against a single quantum error on any of the nine qubits.

If we want to preserve a quantum state for a long time without doing any computations, or if we want to send it through a noisy communications channel, we can just encode the state using a quantum code and decode it when we are done.
Computation on encoded states using noisy gates requires few more tricks (to be completed).

<!--chapter:end:08-decoherence.Rmd-->

# Density matrices

:::: {.comment data-latex=""}
::: {.book-only}
[Click here to view this entire chapter on one page.](../tufte/density-matrices.html#density-matrices)
:::

::: {.tufte-only}
[Click here to view this chapter in the book.](../book/density-matrices.html#density-matrices)
:::
::::

> On ... **!!!TODO!!!**

We cannot always assign a definite state vector to a quantum system.
It may be that the system is part of a composite system that is in an entangled state, or it may be that our knowledge of the preparation of a particular system is insufficient to determine its state (for example, someone may prepare a particle in one of the states $\ket{\psi_1}, \ket{\psi_2}, \ldots, \ket{\psi_n}$, with (respective) probabilities $p_1, p_2, \ldots, p_n$).
Nevertheless, in either case we are able to make statistical predictions about the outcomes of measurements performed on the system using a more general description of quantum states.

We have already mentioned that the existence of entangled states begs an obvious question: if we cannot attribute a state vectors to an individual quantum system then how shall we describe its quantum state?
In this lecture we will introduce an alternate description of quantum states that can be applied both to a composite system and to any of its subsystems.
Our new mathematical tool is called a **density operator**.^[If we choose a particular basis, operators become matrices. Here I will use both terms (density _operators_ and density _matrices_) interchangeably.]
We will start with the density operator as a description of the mixture of quantum states, and will then discuss the partial trace, which is a unique operation that takes care of the reduction of a density operator of a composite system to density operators of its components.





## Definitions

If you are an impatient mathematically minded person, who feels more comfortable when things are properly defined right from the beginning, here is your definition:^[A self-adjoint matrix $M$ is said to be **non-negative**, or **positive semi-definite**, if $\braket{v|M|v}\geq 0$ for any vector $\ket{v}$, or if all of its eigenvalues are non-negative, or if here exists a matrix $A$ such that $M=A^\dagger A$. (This is called a **Cholesky factorization**.)]

::: {.idea data-latex=""}
  A **density operator** $\rho$ on a finite dimensional Hilbert space $\mathcal{H}$ is any non-negative self-adjoint operator with trace equal to one.
:::

It follows that any such $\rho$ can always be diagonalised, that the eigenvalues are all real and non-negative, and that the eigenvalues sum to one.
Moreover, given two density operators $\rho_1$ and $\rho_2$, we can always construct another density operator as a convex sum of the two:
$$
  \rho = p_1\rho_1 + p_2\rho_2
  \qquad\text{where}\quad
  p_1, p_2 \geq 0
  \text{ and }
  p_1+p_2 = 1.
$$
You should check that $\rho$ has all the defining properties of a density matrix, i.e. that it is self-adjoint, non-negative, and that its trace is one.
This means that density operators form a convex set.^[A subset of a vector space is said to be **convex** if, for any two points in the subset, the straight line segment joining them is also entirely contained inside the subset.]
An important example of a density operator is a rank one projector.^[The **rank** of a matrix is the number of its non-zero eigenvalues.]
Any quantum state that can be described by the state vector $\ket{\psi}$, called a **pure state**, can be also described by the density operator  $\rho=\proj{\psi}$.
Pure states are the extremal points in the convex set of density operators: they cannot be expressed as a convex sum of other elements in the set.
In contrast, all other states, called **mixed states**, can be always written as the convex sum of pure states: $\sum_i p_i \proj{\psi_i}$ ($p_i\geq 0$ and $\sum_i p_i=1$).
Now that we have cleared the mathematical essentials, we will turn to physical applications.





## Mixtures

Let us start with probability distributions over state vectors.
Suppose Alice prepares a quantum system and hands it over to Bob who subsequently measures observable $M$.
If Alice's preparation is described by a state vector $\ket{\psi}$, then, quantum theory declares, the average value of any observable $M$ is given by $\braket{\psi|M|\psi}$, which can be also written as^[If $M$ is one of the orthogonal projectors $P_k$ describing the measurement, then the average $\av{P_k}$ is the probability of the outcome $k$ associated with this projector.]
$$
  \av{M} = \tr M\proj{\psi}.
$$
This way of expressing the average value makes a clear separation between the contributions from the state preparation and from the choice of the measurement.
We have two operators under the trace: one of them, $\proj{\psi}$, describes the state preparation, and the other one, $M$, the measurement.
Now, suppose Alice prepares the quantum system in one of the states $\ket{\psi_1},\ldots,\ket{\psi_m}$, choosing state $\ket{\psi_i}$ with probability $p_i$, and hands the system to Bob without telling him which state was chosen.
The possible states $\ket{\psi_i}$ are normalised but need not be orthogonal.
We call this situation a **mixture of the states** $\ket{\psi_i}$, or a **mixed state** for short.

::: {.idea data-latex=""}
  Remember, a mixture of states is very different from a superposition of states: a superposition _always_ yields a definite state vector, whereas a mixture does _not_, and so must be described by a density operator.
:::

Bob knows the ensemble of states $\ket{\psi_1},\ldots,\ket{\psi_m}$ and the corresponding probability distribution $p_1,\ldots,p_m$, and can hence calculate $\av{M}$ as^[A pure state can be seen as a special case of a mixed state, where all but one the probabilities $p_i$ equal zero.]
$$
  \begin{aligned}
    \av{M}
    &= \sum_i p_i\left( \tr M\proj{\psi_i} \right)
  \\&= \tr M \underbrace{\left( \sum_i p_i\proj{\psi_i} \right)}_{\rho}
  \\&=\tr M\rho.
  \end{aligned}
$$
Again, we have two operators under the trace: $\rho=\sum_i p_i\proj{\psi_i}$, which pertains to the state preparation, and $M$, which describes the measurement.
We shall call the operator
$$
  \rho = \sum_i p_i \proj{\psi_i}
$$
the **density operator**, since it has all the defining properties of the density operator (the convex sum of rank one projectors).
It depends on the constituent states $\ket{\psi_i}$ and their probabilities, and it describes our ignorance about the state preparation.
Once we have $\rho$ we can make statistical predictions: for any observable $M$ we have
$$
  \av{M} = \tr M\rho.
$$
We see that the exact composition of the mixture does not enter this formula: for computing the statistics associated with any observable property of a system, all that matters is the density operator itself, and not its decomposition into the mixture of states.
This is important because any given density operator, with the remarkable exception of a pure state, can arise from many different mixtures of pure states.
Consider, for example, the following three scenarios:

1. Alice flips a fair coin.
    If the result is $\texttt{Heads}$ then she prepares the qubit in the state $\ket{0}$, and if the result is $\texttt{Tails}$ then she prepares the qubit in the state $\ket{1}$.
    She gives Bob the qubit without revealing the result of the coin-flip.
    Bob's  knowledge of the qubit is described by the density matrix
    $$
      \frac12\proj{0} + \frac12\proj{1}
      =
      \begin{bmatrix}
        \frac12 & 0
      \\0 & \frac12
      \end{bmatrix}.
    $$

2. Suppose Alice flips a fair coin, as before, but now if the result is $\texttt{Heads}$ then she prepares the qubit in the state $\ket{\bar{0}} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})$, and if the result is $\texttt{Tails}$ then she prepares the qubit in the state $\ket{\bar{1}} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})$.
    Bob's knowledge of the qubit is now described by the density matrix
    $$
      \begin{aligned}
        \frac12\proj{\bar{0}} + \frac12\proj{\bar{1}}
        &=
        \frac12
        \begin{bmatrix}
        \frac12 & \frac12
        \\\frac12 & \frac12
        \end{bmatrix}
        +
        \frac12
        \begin{bmatrix}
        \frac12 & -\frac12
        \\-\frac12 & \frac12
        \end{bmatrix}
      \\&=
        \begin{bmatrix}
        \frac12 & 0
        \\0 & \frac12
        \end{bmatrix}.
      \end{aligned}
    $$

3. Suppose Alice picks up any pair of orthogonal states of a qubit and then flips the coin to chose one of them.
    Any two orthonormal states of a qubit, $\ket{u_1}$, $\ket{u_2}$, form a complete basis, so the mixture $\frac12\proj{u_1}+\frac12\proj{u_2}$ gives $\frac12\id$.

As you can see, these three different preparations yield precisely the same density matrix and are hence statistically indistinguishable.
In general, two different mixtures can be distinguished (in a statistical sense) if and only if they yield different density matrices.
In fact, the optimal way of distinguishing quantum states with different density operators is still an active area of research.





## A few instructive examples, and some less instructive remarks

1. The density matrix corresponding to the state vector $\ket{\psi}$ is the rank one projector $\proj{\psi}$.
    Observe that there is no phase ambiguity, since $\ket{\psi}\mapsto e^{i\phi}\ket{\psi}$ leaves the density matrix unchanged, and each $\ket{\psi}$ gives rise to a distinct density matrix.

2. If Alice prepares a qubit in the state $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$ then the corresponding density matrix is the projector
    $$
      \proj{\psi}
      =
      \begin{bmatrix}
        |\alpha|^2 & \alpha\beta^\star
      \\\alpha^\star\beta & |\beta|^2
      \end{bmatrix}.
    $$

3. You are given a qubit and you are told that it was prepared either in state $\ket{0}$ with probability $|\alpha|^2$ or in state $\ket{1}$ with probability $|\beta|^2$.
    In this case all you can say is that your qubit is in a mixed state described by the density matrix
    $$
      |\alpha|^2\proj{0} + |\beta|^2\proj{1}
      =
      \begin{bmatrix}
        |\alpha|^2 & 0
      \\0 & |\beta|^2
      \end{bmatrix}.
    $$
    Diagonal density matrices correspond to classical probability distributions on the set of basis vectors.

4. Suppose you want to distinguish between preparations described by the density matrices in examples 2 and 3.
    Assume that you are given sufficiently many identically prepared qubits described either by the density matrix in example 2 or by the density matrix in example 3.
    Which of the two measurements would you choose: the measurement in the standard basis $\{\ket{0},\ket{1}\}$, or the measurement in the basis $\{\ket{\psi},\ket{\psi_\perp}\}$?
    One of the two measurements is completely useless.
    Which one, and why?

5. In general, the diagonal entries of a density matrix describe the probability distributions on the set of basis vectors.
    They must add up to one, which is why the trace of any density matrix is one.
    The off-diagonal elements, often called **coherences**, signal departure from the classical probability distribution and quantify the degree to which a quantum system can interfere (we will discuss this in detail later on).
    The process in which off-diagonal entries (the parameter $\epsilon$ in the matrices below) go to zero is called **decoherence**.
    $$
      \begin{bmatrix}
        |\alpha|^2 & \alpha\beta^\star
      \\\alpha^\star\beta & |\beta|^2
      \end{bmatrix}
      \mapsto
      \begin{bmatrix}
        |\alpha|^2 & \epsilon
      \\\epsilon^\star & |\beta|^2
      \end{bmatrix}
      \mapsto
      \begin{bmatrix}
        |\alpha|^2 & 0
      \\0 & |\beta|^2
      \end{bmatrix}
    $$
    For $\epsilon = \alpha\beta^\star$ we have a pure quantum state ("full interference capability") and for $\epsilon=0$ we have a classical probability distribution over the standard basis ("no interference capability").

6. Suppose it is equally likely that your qubit was prepared either in state $\alpha\ket{0} + \beta\ket{1}$ or in state $\alpha\ket{0} - \beta\ket{1}$.
    This means that your qubit is in a mixed state described by the density matrix
    $$
      \frac12
      \begin{bmatrix}
        |\alpha|^2 & \alpha\beta^\star
      \\\alpha^\star\beta & |\beta|^2
      \end{bmatrix}
      +
      \frac12
      \begin{bmatrix}
        |\alpha|^2 & -\alpha\beta^\star
      \\-\alpha^\star\beta & |\beta|^2
      \end{bmatrix}
      =
      \begin{bmatrix}
        |\alpha|^2 & 0
      \\0 & |\beta|^2
      \end{bmatrix}.
    $$
    You cannot tell the difference between the equally weighted mixture of $\alpha\ket{0}\pm\beta\ket{1}$ and a mixture of $\ket{0}$ and $\ket{1}$ with (respective) probabilities $|\alpha|^2$ and $|\beta|^2$.

7. For any density matrix $\rho$, the most natural mixture that yields $\rho$ is its spectral decomposition: $\rho=\sum_i p_i\proj{u_i}$, with eigenvectors $\ket{u_i}$ and eigenvalues $p_i$.

8. If the states $\ket{u_1},\ldots,\ket{u_m}$ form an orthonormal basis, and each occurs with equal probability $1/m$, then the resulting density matrix is proportional to the identity:
    $$
      \frac{1}{m}\sum_{i=1}^m \proj{\psi_i}
      = \frac{1}{m}\id.
    $$
    This is called the **maximally mixed state**.
    For qubits, any pair of orthogonal states taken with equal probabilities gives the maximally mixed state $\frac12\id$.
    In maximally mixed states, outcomes of _any_ measurement are completely random.

9. It is often convenient to write density operators in terms of projectors on states which are not normalised, incorporating the probabilities into the length of the state vector:
    $$
      \rho = \sum_i\proj{\widetilde\psi_i}
    $$
    where $\ket{\widetilde\psi_i} = \sqrt{p_i}\ket{\psi_i}$, i.e. $p_i=\braket{\widetilde\psi_i}{\widetilde\psi_i}$.
    This form is more compact, but you have to remember that the state vectors are _not_ normalised.
    I tend to mark such states with the tilde, e.g. $\ket{\widetilde\psi}$, but you may have your own way to remember.





## Mixed states of a qubit, and the Bloch sphere

**!!!TODO!!! mention the part in chapters 2 and 3 where we have already talked about this, and maybe rewrite the following with that in mind**

There is an elegant way to visualise the set of density operators for a qubit.
The most general Hermitian $(2\times 2)$ matrix has four real parameters and can be expanded in the basis composed of the identity and the three Pauli matrices: $\{\id, \sigma_x, \sigma_y, \sigma_z\}$.
Since the Pauli matrices are traceless, the coefficient of $\id$ in the expansion of a density matrix $\rho$ must be $\frac12$, so that $\tr\rho=1$.
Thus $\rho$ may be expressed as^[Physicists usually refer to the Bloch ball as the **Bloch sphere**, although it really is a ball, not a sphere.]
$$
  \begin{aligned}
    \rho
    &= \frac12\left( \id +\vec{s}\cdot\vec{\sigma} \right)
  \\&= \frac12\left( \id + s_x\sigma_x + s_y\sigma_y + s_z\sigma_z \right)
  \\&= \frac12
    \begin{bmatrix}
      1 + s_z & s_x - is_y
    \\s_x + is_y & 1 - s_z
    \end{bmatrix}.
  \end{aligned}
$$
The vector $\vec{s}$ is called the **Bloch vector** for the density operator $\rho$.
Any real Bloch vector $\vec{s}$ defines a trace one Hermitian operator $\rho$, but in order for $\rho$ to be a density operator it must also be non-negative.
Which Bloch vectors yield legitimate density operators?

Let us compute the eigenvalues of $\rho$.
The sum of the two eigenvalues of $\rho$ is, of course, equal to one ($\tr\rho=1$) and the product is equal to the determinant of $\rho$, which can be computed from the matrix form above:
$$
  \det\rho
  = \frac{1}{4}(1-s^2)
  = \frac12(1+s)\frac12(1+s)
$$
where $s=|\vec{s}|$.
It follows that the two eigenvalues of $\rho$ are $\frac12(1\pm s)$.
They have to be non-negative, and so $s$, the length of the Bloch vector, cannot exceed one.^[One might hope that there is an equally nice visualisation of the density operators in higher dimensions. Unfortunately there isn't.]
We can now visualise the convex set of $2\times 2$ density matrices as a unit ball in three-dimensional Euclidean space: the extremal points, which represent pure states, are the points on the boundary, i.e. the surface of the ball ($s=1$); the maximally mixed state $\id/2$ corresponds to $s=0$, i.e. the centre of the ball.
The length of the Bloch vector $s$ can be thought of as a "purity" of a state.





## Subsystems of entangled systems

I have already trumpeted that one of the most important features of the density operator formalism is its ability to describe the quantum state of a subsystem of a composite system.
Let me now show you how it works.

Given a quantum state of the composite system $\mathcal{AB}$, described by some density operator $\rho^{AB}$, we obtain reduced density operators $\rho^A$ and $\rho^B$ of subsystems $\mathcal{A}$ and $\mathcal{B}$, respectively, by the partial trace:
**!!!TODO!!! should this be $\rho^{\mathcal{A}\mathcal{B}}$? and $\tr_{\mathcal{A}}$? etc., or should $\mathcal{A}$ actually be $\mathcal{H}_A$?**
$$
  \begin{aligned}
    \rho^{AB}
    &\mapsto
    \underbrace{\rho_A=\tr_B\rho^{AB}}_{\mathrm{partial\,trace\,over}\,\mathcal{B}}\qquad
  \\\rho^{AB}
    &\mapsto
    \underbrace{\rho_B=\tr_A\rho^{AB}}_{\mathrm{partial\,trace\,over}\,\mathcal{A}}
  \end{aligned}
$$
We define the partial trace over $\mathcal{B}$, or $\mathcal{A}$, first on a tensor product of two operators $A\otimes B$ as
$$
  \begin{aligned}
    \tr_B (A\otimes B)
    &= A(\tr B)
  \\\tr_A (A\otimes B)
    &= (\tr A) B,
  \end{aligned}
$$
and then extend to any operator on $\mathcal{H}_A\otimes\mathcal{H}_B$ by linearity.

Here is a simple example.
Suppose a composite system $\mathcal{AB}$ is in a pure entangled state, which we can always write as
$$
  \ket{\psi_{AB}}
  = \sum_{i} c_{i} \ket{a_i}\otimes\ket{b_i},
$$
where $\ket{a_i}$ and $\ket{b_j}$ are two orthonormal bases (e.g. the Schmidt bases), and $\sum_i |c_i|^2 = 1$ due to the normalisation.
The corresponding density operator of the composite system is the projector $\rho^{AB}= \proj{\psi_{AB}}$, which we can write as
$$
  \rho^{AB}
  = \proj{\psi_{AB}}
  = \sum_{ij} c_i c^\star_j \ket{a_i}\bra{a_j} \otimes \ket{b_i}\bra{b_j}
$$
Let us compute the reduced density operator $\rho^A$ by taking the partial trace over $\mathcal{B}$:
$$
  \begin{aligned}
    \rho_A
    &= \tr_B\rho^{AB}
  \\&= \tr_B \proj{\psi_{AB}}
  \\&= \tr_B \sum_{ij} c_i c^\star_j \ket{a_i}\bra{a_j} \otimes \ket{b_i}\bra{b_j}
  \\&= \sum_{ij} c_i c^\star_j \ket{a_i}\bra{a_j}(\tr\ket{b_i}\bra{b_j})
  \\&= \sum_{ij} c_i c^\star_j \ket{a_i}\bra{a_j} \underbrace{\braket{b_i}{b_j}}_{\delta_{ij}}
  \\& = \sum_{i} |c_i|^2 \proj{a_i}
  \end{aligned}
$$
where we have used the fact that $\tr\ket{b_i}\bra{b_j} = \braket{b_j|b_i}=\delta_{ij}$.
In the $\ket{a_i}$ basis, the reduced density matrix $\rho^A$ is diagonal, with entries $p_i=|c_i|^2$.
We can also take the partial trace over $\mathcal{A}$ and obtain $\rho_B = \sum_{i} |c_i|^2 \proj{b_i}$.
In particular, for the maximally entangled states in the $(d\times d)$-dimensional Hilbert spaces $\mathcal{H}_A\otimes\mathcal{H}_B$,
$$
  \ket{\psi_{AB}}
  = \frac{1}{\sqrt{d}} \sum_{i}^d \ket{a_i}\ket{b_i},
$$
and the reduced density operators, $\rho_A$ and $\rho_B$, are the maximally mixed states: $\rho_A=\rho_B=\frac{1}{d}\id$.
It follows that the quantum states of individual qubits in any of the Bell states are maximally mixed: their density matrix is $\frac12\id$.
A state such as
$$
  \frac{1}{\sqrt 2} \left( \ket{00} + \ket{11} \right)
$$
guarantees perfect correlations when each qubit is measured in the standard basis: the two equally likely outcomes are ($0$ and $0$) or ($1$ and $1$), but any single qubit outcome, be it $0$ or $1$ or anything else, is completely random.





## Partial trace, revisited

If you are given a matrix you calculate the trace by summing its diagonal entries.
How about the partial trace?
Suppose someone writes down for you a density matrix of two qubits in the standard basis, $\{\ket{00}, \ket{01}, \ket{10}, \ket{11}\}$, and asks you to find the reduced density matrices of the individual qubits.
The tensor product structure of this $(4\times 4)$ matrix means that it is has a block form:
$$
  \rho^{AB}
  =
  \left[
    \begin{array}{c|c}
      P & Q
    \\\hline
      R & S
    \end{array}
  \right]
$$
where $P,Q,R,S$ are $2\times 2$ sized sub-matrices.
The two partial traces can then be evaluated as^[Take any of the Bell states, write its $(4\times 4)$-density matrix explicitly, and then trace over each qubit. In each case you should get the maximally mixed state.]
$$
  \begin{aligned}
    \rho_A
    &=
    \tr_{B}\rho^{AB}
    =
    \left[
      \begin{array}{c|c}
        \tr P & \tr Q
      \\\hline
        \tr R & \tr S
      \end{array}
    \right]
  \\\rho_B
    &= \tr_{A}\rho^{AB}
    = P+S.
  \end{aligned}
$$
The same holds for a general $\rho^{AB}$ on any $\mathcal{H}_A\otimes\mathcal{H}_B$ with corresponding block form ($(m\times m)$ blocks of $(n\times n)$-sized sub-matrices, where $m$ and $n$ are the dimensions of  $\mathcal{H}_A$ and $\mathcal{H}_B$, respectively).





## Mixtures and subsystems

We have used the density operators to describe two distinct situations: the statistical properties of the mixtures of states, and the statistical properties of subsystems of composite systems.
In order to see the relationship between the two, consider a joint state of a bipartite system $\mathcal{AB}$, written in a product basis in $\mathcal{H}_A\otimes\mathcal{H}_B$ as
\begin{equation}
  \begin{aligned}
    \ket{\psi_{AB}}
    &= \sum_{ij} c_{ij}\ket{a_i}\otimes\ket{b_j}
  \\&= \sum_{j=1} \ket{\widetilde\psi_j}\ket{b_j}
  \\&= \sum_{j=1} \sqrt{p_j}\ket{\psi_j}\ket{b_j}
  \end{aligned}
(\#eq:bipartite)
\end{equation}
where $\ket{\widetilde\psi_j} = \sum_i c_{ij}\ket{a_i} = \sqrt{p_j}\ket{\psi_j}$, and the vectors $\ket{\psi_j}$ are the normalised versions of the $\ket{\widetilde\psi_j}$.
Note that $p_j=\braket{\widetilde\psi_j|\widetilde\psi_j}$.

Then the partial trace over $\mathcal{B}$ gives the reduced density operator of subsystem $\mathcal{A}$:
$$
  \begin{aligned}
    \rho^A
    =\tr_B \sum_{ij} \ket{\widetilde\psi_i}\bra{\widetilde\psi_j} \otimes \ket{b_i}\bra{b_j}
    &= \sum_{ij} \ket{\widetilde\psi_i}\bra{\widetilde\psi_j} (\tr\ket{b_i}\bra{b_j})
  \\&= \sum_{ij} \ket{\widetilde\psi_i}\bra{\widetilde\psi_j} \braket{b_j|b_i}
  \\&= \sum_{i} \ket{\widetilde\psi_i}\bra{\widetilde\psi_i}
    = \sum_{i} p_i \proj{\psi_i}.
  \end{aligned}
$$

Now, let us see how $\rho^A$ can be understood in terms of mixtures.
Let us place subsystems $\mathcal{A}$ and $\mathcal{B}$ in separate labs, run by Alice and Bob, respectively.
When Bob measures part $\mathcal{B}$ in the $\ket{b_j}$ basis and obtains result $k$, which happens with the probability $p_k$, he prepares subsystem $\mathcal{A}$ in the state $\ket{\psi_k}$:
$$
  \sum_{i=1} \sqrt{p_j}\ket{\psi_i}\ket{b_i}
  \overset{\mathrm{outcome}\,k}{\longmapsto}
  \ket{\psi_k}\ket{b_k}.
$$
Bob does not communicate the outcome of his measurement.
Thus, from Alice's perspective, Bob prepares a mixture of $\ket{\psi_1},\ldots,\ket{\psi_m}$, with probabilities $p_1,\ldots,p_m$, which means that Alice, who knows the joint state but not the outcomes of Bob's measurement, may associate density matrix $\rho_A=\sum_i p_i\proj{\psi_i}$ with her subsystem $\mathcal{A}$.
This is the same $\rho^A$ which we obtained by the partial trace.

But suppose Bob chooses to measure his subsystem in some other basis.
Will it have any impact on Alice's statistical predictions?
Measurement in the new basis will result in a different mixture, but Alice's density operator will not change.
Suppose Bob chooses basis $\ket{d_i}$ for his measurement.
Any two orthonormal bases are connected by some unitary transformation, and so we can write $\ket{b_i} = U\ket{d_i}$ for some unitary $U$.
In terms of components, $\ket{b_i} = \sum_j U_{ij}\ket{d_j}$.
The joint state can now be expressed as
$$
  \begin{aligned}
    \ket{\psi_{AB}}
    &= \sum_{i} \ket{\widetilde\psi_i}\ket{b_i}
  \\&= \sum_{i} \ket{\widetilde\psi_i} \left( \sum_j U_{ij}\ket{d_j} \right)
  \\&= \sum_j \underbrace{\left( \sum_i U_{ij}\ket{\widetilde\psi_i} \right)}_{\ket{\widetilde\phi_j}}\ket{d_j}
  \\&= \sum_j\ket{\widetilde\phi_j}\ket{d_j}.
  \end{aligned}
$$

If Bob measures in the $\ket{d_i}$ basis then he generates a new mixture of states $\ket{\phi_1},\ldots\ket{\phi_m}$, which are the normalised versions of $\ket{\widetilde\phi_1},\ldots\ket{\widetilde\phi_m}$, with each $\ket{\phi_k}$ occurring with probability $p_k=\braket{\widetilde\phi_k}{\widetilde\phi_k}$.
But this new mixture has exactly the same density operator as the previous one:^[The $U_{ij}$ are the components of a unitary matrix, hence $\sum_k U_{ik}U^\star_{jk}=\delta_{ij}$.]
$$
  \begin{aligned}
    \sum_j\proj{\widetilde\phi_j}
    &= \sum_{ijl} U_{ij}\ket{\widetilde\psi_i}\bra{\widetilde\psi_l}U^\star_{lj}
  \\&= \sum_{il} \underbrace{\left(\sum_j U_{ij}U^\star_{lj}\right)}_{\delta_{il}}\ket{\widetilde\psi_i}\bra{\widetilde\psi_l}
  \\&= \sum_i\proj{\widetilde\psi_j},
  \end{aligned}
$$
which is exactly $\rho_A$.
So does it really matter whether Bob performs the measurement or not?

_It does not._

After all, Alice and Bob may be miles away from each other, and if any of Bob's actions were to result in something that is physically detectable at the Alice's location that would amount to instantaneous communication between the two of them.

From the operational point of view it does not really matter whether the density operator represents our ignorance of the actual state (mixtures) or provides the only description we can have after discarding one part of an entangled state (partial trace).^[The two interpretations of density operators filled volumes of academic papers. The terms **proper mixtures** and **improper mixtures** are used, mostly by philosophers, to describe the statistical mixture and the partial trace approach, respectively.]
In the former case, the system is in some definite pure state but we do not know which.
In contrast, when the density operator arises from tracing out irrelevant, or unavailable, degrees of freedom, the individual system cannot be thought to be in some definite state of which we are ignorant.
Philosophy aside, the fact that the two interpretations give exactly the same predictions is useful: switching back and forth between the two pictures often offers additional insights and may even simplify lengthy calculations.





## Partial trace, yet again

The partial trace is the only map $\rho^{AB}\mapsto\rho^A$ such that^[One can repeat the same argument for $\rho^{AB}\mapsto\rho^B$: the partial trace is the unique map $\rho^{AB}\mapsto\rho^B$ such that $\rho^B$ satisfies $\tr Y\rho^B = \tr (1\otimes Y)\rho^{AB}$ for any observable $Y$ on $\mathcal{B}$.]
$$
  \tr X \rho^A = \tr (X\otimes\id)\rho^{AB}
$$
holds for any observable $X$ acting on $\mathcal{A}$.
This condition concerns the consistency of statistical predictions.
Any observable $X$ on $\mathcal{A}$ can be viewed as an observable $X\otimes\id$ on the composite system $\mathcal{AB}$, where $\id$ is the identity operator acting on $\mathcal{B}$.
When constructing $\rho^A$ we had better make sure that for any observable $X$ the average value of $X$ in the state $\rho_A$ is the same as the average value of $X\otimes\id$ in the state $\rho^{AB}$.
This is indeed the case for the partial trace.

For example, let us go back to the state in \@ref(eq:bipartite) and assume that Alice measures some observable $X$ on her part of the system.
Technically, such an observable can be expressed as $X\otimes \id$, where $\id$ is the identity operator acting on the subsystem $\mathcal{B}$.
The expected value of this observable in the state $\ket{\psi_{AB}}$ is $\tr (X\otimes\id)\proj{\psi_{AB}}$, i.e.
$$
  \begin{aligned}
    \tr (X\otimes \id) \rho^{AB}
    &= \tr (X\otimes\id) \left(
        \sum_{ij} \ket{\widetilde\psi_i}\bra{\widetilde\psi_j} \otimes \ket{b_i}\bra{b_j}
      \right)
  \\&= \sum_{ij} \left[
        \tr\left(X \ket{\widetilde\psi_i}\bra{\widetilde\psi_j}\right)
      \right]
      \underbrace{\left[\tr\left(\ket{b_i}\bra{b_j}\right)\right]}_{\delta_{ij}}
  \\&= \sum_i \tr X \ket{\widetilde\psi_i}\bra{\widetilde\psi_i}
  \\&= \tr X \underbrace{\sum_i p_i\proj{\psi_i}}_{\rho^A = \tr_B\rho^{AB}}
  \\&= \tr X\rho^A,
  \end{aligned}
$$
as required.

**!!!TODO!!! The uniqueness of the partial trace, for now see Nielsen & Chuang Box 2.6.**





## Notes and exercises

1. Show that an arbitrary mixed state $\rho$ can be represented as the partial trace $\tr\proj{\psi}$ of a pure state of a larger system.
    Such a $\ket{\psi}$ is called a **purification** of $\rho$.

2. Show that purification is unique up to unitary equivalence.
    Let $\ket{\psi_1}$ and $\ket{\psi_2}$ in $\mathcal{H}_A\otimes\mathcal{H}_B$ be two pure states such that $\tr_B\proj{\psi_1} = \tr_B\proj{\psi_2}$.
    Show that $\ket{\psi_1} = \id\otimes U\ket{\psi_2}$ for some unitary operator $U$ on $\mathcal{H}_B$.

3. Two qubits are in the state described by the density operator $\rho = \rho_A\otimes\rho_B$.
    What is the partial trace of $\rho$ over each qubit?

4. Write the density matrix of two qubits corresponding to the mixture of the Bell state $\frac{1}{\sqrt 2}\left(\ket{00} + \ket{11}\right)$ with probability $\frac12$ and the maximally mixed state of two qubits ($(4\times 4)$ matrix in $\mathcal{H}_A\otimes\mathcal{H}_B$) with probability $\frac12$.

5. **!!!TODO!!! Trace norm**

6. **!!!TODO!!! How to distinguish between two different density operators**

<!--chapter:end:09-density-matrices.Rmd-->

# Quantum channels (or CP maps)

<!--chapter:end:10-CP-maps.Rmd-->

# Quantum error correction and fault tolerance

<!--chapter:end:11-error-correction.Rmd-->

# Bonus things

> ...

**!!!TODO!!! graphical calculus stuff, the philosophical problem of measurement, some history of experimental results**




<!--chapter:end:12-more.Rmd-->


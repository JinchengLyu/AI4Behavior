import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND } from "../../consts";
import "./tasks.css";

const FidelityAssessment = () => {
  const [expandReasoning, setExpandReasoning] = useState(false);

  const toggleReasoning = () => {
    setExpandReasoning(!expandReasoning);
  };

  const ReasoningCollapse = () => {
    return (
      <ul>
        <li>+1 point - parent provide model ("One, two, three")</li>
        <li>+1 point - Joint attention obtained (child look at book)</li>
        <li>+1 point - Child provide response ("One, two, three, four") </li>
        <li>+1 point - parent provide feedback ("No, Just three.") </li>
      </ul>
    );
  };

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-4xl font-bold mb-4">Fidelity Assessment</h1>

      {/* Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          The Fidelity Assessment task is part of the ASD-HI dataset and focuses
          on evaluating the quality of parent-implemented Naturalistic
          Communication Teaching (NCT) strategies during reading sessions with
          children with autism. This task assesses how effectively parents
          execute these strategies, which are critical for early interventions.
        </p>
        <p className="mt-2">
          A total of <strong>478 parent strategy instances</strong> were
          manually evaluated across <strong>48 reading sessions</strong> from{" "}
          <strong>three families</strong>. Each instance is assigned a fidelity
          score on a 4-point scale (1=Low to 4=High) based on specific criteria.
          The goal of this task is to classify the fidelity of strategy
          implementation in segmented video clips, returning the correct
          fidelity score for each instance.
        </p>
      </section>

      {/* Demo */}
      <section className="demoContainer">
        <video className="demoVideo" controls>
          <source
            src={`${BACKEND}/videos/clip_1_a_l_10_14_20_baseline_1_mov.mp4`}
            type="video/mp4"
          />
        </video>
        <div>
          <button onClick={toggleReasoning} className="dataset">
            Fidelity 4 Reasoning:{"\u2B9F"}
          </button>
          <div className="reasoningCollapse">
            {expandReasoning && <ReasoningCollapse />}
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section id="fidelity-assessment">
        <h2 className="text-2xl font-semibold mb-2">
          Fidelity Assessment for Parent Strategies
        </h2>
        <p>
          This section explains how the fidelity of three parent strategies—Modeling,
          Mand-Model, and Time Delay—is assessed. Each strategy has four levels
          (Fidelity 1 to 4), based on criteria like joint attention, prompting,
          waiting time, and response to the child.
        </p>

        <h3 className="mt-6 font-semibold">a. When Parent Uses Modeling</h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Fidelity 1</strong> – The parent presents a verbal or a
            gestural model that is related to the child’s interest and/or
            story/picture in the book (no joint attention).
          </li>
          <li>
            <strong>Fidelity 2</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal or a gestural model
            that is related to book.
          </li>
          <li>
            <strong>Fidelity 3</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal or a gestural model
            that is related to book AND waits 3–5 s for the child to respond.
          </li>
          <li>
            <strong>Fidelity 4</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal or a gestural model
            that is related to book AND waits 3–5 s for the child to respond AND
            responds to the child’s behavior by providing verbal feedback or, if
            the child does not respond, the parent repeats the SAME sequence of
            steps one last time.
          </li>
        </ul>

        <h3 className="mt-6 font-semibold">b. When Parent Uses Mand-Model</h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Fidelity 1</strong> – The parent presents a verbal prompt in
            the form of a question, a choice, or a mand. (No joint attention).
          </li>
          <li>
            <strong>Fidelity 2</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal prompt in the form
            of a question, a choice, or a mand.
          </li>
          <li>
            <strong>Fidelity 3</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal prompt in the form
            of a question, a choice, or a mand AND waits 3–5 s for the child to
            respond.
          </li>
          <li>
            <strong>Fidelity 4</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal prompt in the form
            of a question, a choice, or a mand AND waits 3–5 s for the child to
            respond AND responds to the child’s behavior by providing verbal
            feedback or, if the child does not respond, the parent repeats the
            SAME sequence of steps one last time and models the response.
          </li>
        </ul>

        <h3 className="mt-6 font-semibold">c. When Parent Uses Time Delay</h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Fidelity 1</strong> – Parent looks expectantly at the child,
            but no joint attention.
          </li>
          <li>
            <strong>Fidelity 2</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND leaves a familiar phrase/sentence/rhyme
            incomplete and looks expectantly at the child to fill in the blank.
          </li>
          <li>
            <strong>Fidelity 3</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND leaves a familiar phrase/sentence/rhyme
            incomplete and looks expectantly at the child 5–7 seconds to fill in
            the blank.
          </li>
          <li>
            <strong>Fidelity 4</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND leaves a familiar phrase/sentence/rhyme
            incomplete and looks expectantly at the child 5–7 seconds to fill in
            the blank AND responds to the child’s behavior by providing verbal
            feedback or, if the child does not fill in the blank, the parent
            repeats the same sequence of steps one last time and models the
            response.
          </li>
        </ul>
      </section>

      {/* Evaluation */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Evaluation</h2>
        <p>Submissions will be evaluated using the following metrics:</p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <strong>Accuracy</strong>: Proportion of correctly classified
            fidelity scores
          </li>
          <li>
            <strong>F1 Score</strong>: Harmonic mean of precision and recall for
            the 4-way classification
          </li>
        </ul>
        <p className="mt-2">
          Higher accuracy ensures correct fidelity classification, while a
          balanced F1 score accounts for class imbalances across the 4-point
          scale.
        </p>
      </section>

      {/* Downloads */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Downloads</h2>
        <p>
          Explore annotated data here <Link to="/files">download</Link>
        </p>
      </section>

      {/* Attribution Statement & References */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Attribution Statement</h2>
        <p>
          The original descriptions of the naturalistic communication teaching
          strategies (modeling, mand-model, and time delay) and the associated
          fidelity levels (Fidelity 1 through Fidelity 4) were first developed
          as part of the Parent-Implemented Communication Strategies (PiCS)
          intervention by Meadan and colleagues (Meadan et&nbsp;al., 2013, 2014,
          2016). Dr. Akemoglu has adapted the strategies for use within shared
          reading and telepractice-delivered interventions. These adaptations
          are supported by multiple datasets collected across several studies
          (e.g., Akemoglu &amp; Meadan, 2019; Akemoglu &amp; Tomeny, 2021;
          Akemoglu et&nbsp;al., 2022a; Akemoglu et&nbsp;al., 2022b). Yet only
          the following three main datasets were used with the AI Multi-Model
          Study:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            Akemoglu, Y., Laroue, D., Kudesey, C., &amp; Stahlman, M. (2022). A
            module-based telepractice intervention for parents of children with
            developmental disabilities. <em>Journal of Autism and Developmental
            Disorders</em>, 52, 5177–5190.
          </li>
          <li>
            Akemoglu, Y., Hinton, V., Laroue, D., &amp; Jefferson, V. (2022).
            Parent-implemented shared reading intervention via telepractice.{" "}
            <em>Journal of Early Intervention</em>, 44(2), 190–210.
          </li>
          <li>
            Akemoglu, Y., &amp; Tomeny, K. (2021). A parent-implemented shared
            reading intervention to promote communication skills of preschoolers
            with autism spectrum disorder. <em>Journal of Autism and
            Developmental Disorders</em>, 51(8), 2974–2987.
          </li>
        </ul>
        <p className="mt-2">
          Thus, the current materials represent adaptations from Meadan
          et&nbsp;al. (2013; 2014; 2016) that have been revised and extended for
          shared reading routines and validated through these datasets.
        </p>

        <h3 className="mt-4 font-semibold">References to Original PiCS Work</h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            Meadan, H., Meyer, L. E., Snodgrass, M. R., &amp; Halle, J. W.
            (2013). Coaching parents of young children with autism in rural
            areas using internet-based technologies: A pilot program.{" "}
            <em>Rural Special Education Quarterly</em>, 23(3), 3–10.
          </li>
          <li>
            Meadan, H., Angell, M. E., Stoner, J. B., &amp; Daczewitz, M.
            (2014). Parent-implemented social-pragmatic communication
            intervention: A pilot study.{" "}
            <em>Focus on Autism and Other Developmental Disabilities</em>,
            29(2), 95–110.
          </li>
          <li>
            Meadan, H., Snodgrass, M. R., Meyer, L. E., Fisher, K. W., Chung,
            M. Y., &amp; Halle, J. W. (2016). Internet-based parent-implemented
            intervention for young children with autism: A pilot study.{" "}
            <em>Journal of Early Intervention</em>, 38(1), 3–23.
          </li>
        </ul>
      </section>

      {/* Submission (kept commented as in your original)
      <section>
        <h2 className="text-2xl font-semibold mb-2">Submission</h2>
        <p>
          Participants should submit a JSON file for each session clip,
          containing:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Session ID</li>
          <li>Strategy instance ID with corresponding fidelity score (1-4)</li>
        </ul>
        <p className="mt-2">
          Submission instructions and formatting guidelines will be published
          alongside the dataset.
        </p>
      </section> */}
    </div>
  );
};

export default FidelityAssessment;

import React from "react";
import ReadingTogetherImage from './Pictures/reading-together-dinosaur-book.jpg';
import LoremIpsum from "react-lorem-ipsum";
import "./Home.css";

const HomePage = () => {
  return (
      <div className="home-content">
        <div id="news" style={{marginBottom: '0rem', marginTop:'0.5rem'}}>
          <h2>News</h2>
          <ul style={{listStyleType: 'none', padding: 0}}>
            {/*<li style={{marginBottom: '1rem'}}>*/}
            {/*  <strong>Announcement: </strong>*/}
            {/*</li>*/}
            <li style={{marginBottom: '1rem'}}>
              <strong>2025-4-15:</strong> The ASD-HI Dataset Paper has been accepted by AIED 2025 conference as long paper!
            </li>
            <li style={{marginBottom: '1rem'}}>
              <strong>2025-1-15:</strong> We launched the Strategy Detection task for the longer video section.
            </li>
            <li style={{marginBottom: '1rem'}}>
              <strong>2025-1-10:</strong> We launched the Fidelity Assessment task of the video clips.
            </li>
            <li style={{marginBottom: '1rem'}}>
              <strong>2024-12-10:</strong> We published the first version of our dataset.
            </li>
            <li style={{marginBottom: '1rem'}}>
              <strong>2024-11-05:</strong> We officially launched the ASD-HI project.
            </li>
          </ul>
        </div>

        <div id="intro" style={{marginBottom: '0rem', marginTop: '0rem'}}>
          <h2>Introduction</h2>
          <p>
            <strong>ASD-HI</strong> is an innovative project designed to enhance the understanding of
            autism-related behaviors and provide actionable interaction strategies for parents. This cutting-edge AI
            research initiative is developed for advancing research and applications in special education and behavioral
            science. It is supported by the{' '}
            <a
                href="https://new.nsf.gov/funding/opportunities/national-artificial-intelligence-research-institutes"
                target="_blank"
                rel="noopener noreferrer"
            >
              National Artificial Intelligence (AI) Research Institute
            </a>, led by the{' '}
            <a
                href="https://www.buffalo.edu/"
                target="_blank"
                rel="noopener noreferrer"
            >
              University at Buffalo
            </a>.
          </p>
          <p>
            The project collects real-world multi-modal data, including video recordings, from user study sessions
            involving children with autism and their parents. This data is meticulously annotated with high reliability
            to ensure accurate analysis and application. By bridging the gap between advanced AI techniques and the
            expertise of Speech-Language Pathologists (SLPs), ASD-HI aims to facilitate research in AI-driven
            solutions for special education and improve outcomes for children with autism and their families.
          </p>
        </div>
        <div id="tasks" style={{marginBottom: '2rem', marginTop:'0rem'}}>
          <h2>What is ASD-HI?</h2>
          <div className="tasksContent" style={{display: 'flex', gap: '2rem'}}>
            <div style={{flex: '1'}}>
              <p>
                <strong>ASD-HI</strong> (Autism Spectrum Disorder - Home Intervention) is a multi-modal dataset designed to
                capture and classify the nuances of parent-child interactions.
                Leveraging video, audio, and contextual data, researchers and
                practitioners can identify parenting strategies, measure
                their effectiveness, and gain insights into the behavioral
                dynamics between parents and their children.
              </p>
              <p>
                By annotating and categorizing these interactions into distinct
                strategies and providing quality scores, ASD-HI
                supports experts, caregivers, and AI developers in
                understanding what approaches work best for fostering
                healthy, positive parent-child relationships.

                Another core component of ASD-HI involves feedback generation
                using generative AI. By analyzing the interaction data, the system
                can produce tailored recommendations for parents. These suggestions
                highlight strengths, pinpoint areas needing improvement, and
                provide actionable guidance. This personalized feedback loop
                aims to empower parents to refine their approaches, ultimately
                promoting better developmental outcomes for children.
              </p>
            </div>

            <div style={{flex: '1'}}>
              <img
                  src={ReadingTogetherImage}
                  alt="Parent and child reading together"
                  style={{width: '95%', marginTop: '1rem', borderRadius: '8px'}}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomePage;

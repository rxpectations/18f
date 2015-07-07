Rxpectations [18F Agile BPA RFQ-Response]
======
Link to prototype: http://rxpectations.herokuapp.com/ 

Agile Design and Development Approach
--------------------------------------------------

Thousands of prescription and over-the-counter medications, each with the potential to cause side effects, are on the market today. An enormous amount of information and data from many disparate sources, both reliable and unreliable, are available for each of these drugs. Even the most informed healthcare provider or consumer is challenged to keep up with the data. Rxpectations is a responsive mobile and web application that enables patients and their caregivers to review the risks of FDA-approved drugs, view recalls, report adverse events and, ultimately, participate in more informed decisions about their healthcare and treatment.

Rxpectations was developed during a hackathon to demonstrate our agile design and development capabilities, leveraging the U.S. Digital Services Playbook (https://playbook.cio.gov/), and our passion for building innovative, engaging and impactful digital experiences. A description of our process is below. 

*Additional information on our approach and process can be found at https://github.com/rxpectations/18f/wiki/Artifacts. Numbers in-line below (e.g., [1]) refer to specific slides numbers in the deck in the artifacts.*

*A video overview of our journey can be found at https://github.com/rxpectations/18f/blob/master/_artifacts/Rxpectations%20Build%20Video.mp4* 

##**Approach**

Planning for the hackathon started with understanding the challenge and assembling a team of digital strategists, designers, developers, data analysts, and subject matter specialists. First, the team established baseline operations based on our experience delivering successful digital products and services. The team defined roles and responsibilities (e.g., Product Manager sets the product vision and business priorities and advocates on behalf of the customer) [16]; agreed on a common set of collaboration tools (i.e., Basecamp, GitHub, Google Hangouts, etc.); developed a project schedule; and cataloged the OpenFDA dataset. [9]

###**Get Inspired!** [Ideation]

On Day 1, the full team convened for kick-off—in-person at our Digital Services team location in Florida and remotely from Chicago and Washington D.C. – to conduct ideation and discovery. The team cast a wide net to uncover new and existing problems in the challenge domain—ideas at this stage were unconstrained, fed by industry knowledge, personal experiences, news events and other sources. Ideas were then synthesized, matched back to the available data, and pared down to the Top 3 opportunities to explore. Finally, the Top 3 were evaluated by potential value to end users and voted on by the team to select a top idea to conceptualize and explore more deeply. Our hypothesis was that consumers want an easily accessible, user friendly, and reliable way to access information about the medicines they take or are considering taking, the side effects of those medications, and any reported adverse events in order to engage with their healthcare providers and to make more informed decisions about their treatment. [8-12]

###**Start with People** [Discovery]

During discovery, the strategy team worked closely with end users to elicit the “Voice of the Customer” using human-centered design techniques, including interviews and empathy building exercises. The team mapped a typical patient’s journey—from pre-diagnosis through relapse—when experiencing a condition requiring medication. We defined personas for each patient segment (e.g., a patient selecting a treatment plan) to uncover common behaviors, hidden motivations and influences, pain points and bright spots, which were then mapped back to the customer journey. [13-19]

###**Solve for the Core Need** [Discovery continued]

With a deeper understanding of the customer’s needs and wants, the team focused on two of the most problematic areas of the customer journey: diagnosis and treatment. Here, users expressed anger, confusion, fear, uncertainty and other emotions around the medicines they were taking or planned to take. Many asked, “Is there an easier way for me to understand the risks?”

The team captured these concerns and developed potential solutions using user stories (e.g., as a transplant candidate, I want to know the potential side effects of my medicine so I can discuss further with my doctor). The design team began to build a feature set from the user stories using whiteboard mockups which were quickly translated to digital wireframes. [22] The team then conducted hallway usability tests to further validate the concept and iterate on the rough information design. [27]

At the same time that the business strategy was being defined, the development team worked to identify a technology stack to support a speedy, lightweight, yet powerful user experience without limiting device choice and application scalability. A modern, open and standards-compliant architecture was selected consisting of Kraken.js and Stylus with Jeet grid and Nib mix-ins. [25] The team also proposed a ”mobile-first” design and development approach using a responsive grid to facilitate broader adoption and device compatibility and to ease complexity when developing for desktop clients. [28] Building the backend began almost immediately with the development team creating the necessary models and the DevOps team configuring the hosting environment (Heroku), continuous integration services (Jenkins) and the distributed version control system (git). [25]
 
At the end of Day 1, the team reconvened to discuss the prioritization of the user stories with the Product Manager and to build the product backlog based on the day’s learnings. The team worked with the Delivery Manager to organize and prioritize the backlog into a release plan for the first sprint. [22]

###**Don’t Stop Iterating** [Sprint]

On Day 2 and all subsequent days, we sprinted to continually deliver working product increments. The team agreed to a cadence of sprint planning first thing in the morning; sprinting till noon; and a scrum with the Product Manager to answer any open questions on sprint tasks and to identify any blockers the Delivery Manager needed to help address. At the end of each day, we conducted backlog grooming, sprint review, and retrospectives with team and Product Manager.

Throughout each sprint, the team conducted usability tests—A/B, Think Out Loud, Man-on-the-Street and Remote—to challenge our assumptions, iterate on the design and content, and validate the original value proposition. [27, 31-32] Feedback from these testing sessions was shared among the team during scrum and through our proofing tool (i.e., ProofHQ). The team made adjustments to planning and priorities based on the testing results.

As the design evolved, so did the codebase. The development team rapidly added new code to support functionality (e.g., when UI changes required new service discovery, intake and wiring) while continuing to iterate on and mature existing code. During each sprint the code was subject to three levels of testing rigor—unit tests, expert reviews and peer reviews—with defects corrected at the time of discovery. [34]

Additionally, application monitoring (i.e., New Relic) and baseline analytics (i.e., Google) were closely tracked to avoid performance degradations. As the team neared the end of development, additional tests were conducted on our “wall of devices” [33] to analyze compatibility across multiple devices and browsers (Chrome, Firefox, Internet Explorer and Safari at least two major versions back) as well as to test compliance with Section 508 accessibility standards.

##**Conclusion**

Our approach to building digital services combines the best of a creative agency model with a global strategy-to-execution consultancy that puts the customer at the core of all our digital products and services. For this effort, as with all our digital products, we not only brought in resources with digital and technical expertise, but also colleagues that are specialists in the subject industries – in this case the medical, pharmaceutical, healthcare provider and public health fields. We had so much fun building Rxpectations and we encourage you to download, edit, remix, and build upon [35] the application so that patients, healthcare practitioners, caregivers and others are empowered to make better healthcare decisions.

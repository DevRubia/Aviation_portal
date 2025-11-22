export const guidelines = {
  SPL: {
    title: "Student Pilot License",
    requirements: [
      "Must be at least 16 years of age.",
      "Class 2 Medical Certificate.",
      "English Language Proficiency.",
      "Security Clearance."
    ],
    description:
      "The SPL is the first step in your pilot training. It allows you to fly solo under the supervision of a flight instructor."
  },

  PPL: {
    title: "Private Pilot License",
    requirements: [
      "Must be at least 17 years of age.",
      "Valid SPL.",
      "Minimum 40 hours of flight time.",
      "Pass theoretical knowledge exams.",
      "Pass practical flight test."
    ],
    description:
      "The PPL allows you to fly private aircraft for non-commercial purposes. You can carry passengers but cannot be paid for flying."
  },

  CPL: {
    title: "Commercial Pilot License",
    requirements: [
      "Must be at least 18 years of age.",
      "Valid PPL.",
      "Minimum 200 hours of flight time.",
      "Class 1 Medical Certificate.",
      "Pass CPL theoretical exams.",
      "Pass CPL flight test."
    ],
    description:
      "The CPL allows you to fly for compensation or hire. It is required for a career as a professional pilot."
  },

  ATPL: {
    title: "Airline Transport Pilot License",
    requirements: [
      "Must be at least 21 years of age.",
      "Valid CPL and Instrument Rating.",
      "Minimum 1500 hours of flight time.",
      "Class 1 Medical Certificate.",
      "Pass ATPL theoretical exams.",
      "Multi-crew experience."
    ],
    description:
      "The ATPL is the highest level of pilot certification, required to act as captain on commercial airline aircraft."
  },

  IR: {
    title: "Instrument Rating",
    requirements: [
      "Valid PPL or CPL.",
      "Completed instrument flight training.",
      "Pass instrument rating theory exams.",
      "Pass IR flight test."
    ],
    description:
      "The Instrument Rating allows pilots to fly in low-visibility and under IFR procedures."
  },

  MER: {
    title: "Multi-Engine Rating",
    requirements: [
      "Valid PPL or CPL.",
      "Multi-engine training.",
      "Pass multi-engine flight test."
    ],
    description:
      "The Multi-Engine Rating enables a pilot to fly aircraft with more than one engine."
  },

  NightRating: {
    title: "Night Rating",
    requirements: [
      "Valid PPL.",
      "Night flight training.",
      "Minimum required night solo hours."
    ],
    description:
      "The Night Rating allows pilots to operate aircraft after sunset and before sunrise."
  },

  FI: {
    title: "Flight Instructor Rating",
    requirements: [
      "Valid CPL or PPL with additional flight hours.",
      "Completed instructor training course.",
      "Pass instructor skills test."
    ],
    description:
      "The Flight Instructor Rating allows pilots to train and instruct student pilots."
  },

  CCL: {
    title: "Cabin Crew License",
    requirements: [
      "Medical fitness certificate.",
      "Safety and emergency procedures training.",
      "Firefighting and ditching drills.",
      "Pass cabin crew exams."
    ],
    description:
      "The Cabin Crew License certifies flight attendants in safety, emergency, and passenger service procedures."
  },

  Dispatcher: {
    title: "Flight Operations Officer / Dispatcher License",
    requirements: [
      "Completion of flight operations training.",
      "Knowledge exams (meteorology, planning, performance).",
      "On-the-job training experience.",
      "Pass dispatcher certification exam."
    ],
    description:
      "Dispatchers are responsible for flight planning, weather analysis, and operational control of flights."
  },

  MedicalCertificates: {
    title: "Medical Certificates",
    requirements: [
      "Class 1 Medical for commercial and airline pilots.",
      "Class 2 Medical for PPL and SPL.",
      "Periodic renewal depending on age and class."
    ],
    description:
      "Medical certificates ensure pilots and crew meet required health and fitness standards."
  },

  ELP: {
    title: "English Language Proficiency",
    requirements: [
      "Demonstrate ICAO Level 4, 5, or 6 English proficiency.",
      "Periodic renewal for levels below 6."
    ],
    description:
      "English proficiency is required for communication in international aviation operations."
  }
};

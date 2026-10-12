import { ClinicService, Veterinarian, ClinicContactConfig, AppointmentBooking } from '../types/clinic';
import heroPetClinicImg from '../assets/images/hero_pet_clinic_1791793011525.jpg';
import clinicInteriorImg from '../assets/images/clinic_interior_about_1791793030215.jpg';
import vetDoctor1Img from '../assets/images/vet_doctor_1_1791793042326.jpg';
import vetDoctor2Img from '../assets/images/vet_doctor_2_1791793054316.jpg';
import vetDoctor3Img from '../assets/images/vet_doctor_3_1791793069632.jpg';
import vetDoctor4Img from '../assets/images/vet_doctor_4_1791793081839.jpg';

export const CLINIC_IMAGES = {
  hero: heroPetClinicImg,
  interior: clinicInteriorImg,
  vet1: vetDoctor1Img,
  vet2: vetDoctor2Img,
  vet3: vetDoctor3Img,
  vet4: vetDoctor4Img,
};

export const SERVICES_DATA: ClinicService[] = [
  {
    id: 'srv-checkup',
    name: 'General Health Checkups',
    category: 'Preventive Care',
    shortDescription: 'Complete nose-to-tail physical examinations, weight tracking, and early disease screening for dogs, cats, and companion birds.',
    fullDescription: 'Our comprehensive nose-to-tail wellness examination evaluates cardiovascular health, respiratory function, coat condition, joint mobility, and lymphatic health. Recommended every 6 months to detect subtle clinical changes early.',
    priceLKR: 3500,
    durationMinutes: 30,
    iconName: 'Stethoscope',
    highlights: [
      'Full 14-point physical examination',
      'Parasite & tick prevention review',
      'Weight & body condition scoring',
    ],
  },
  {
    id: 'srv-vaccination',
    name: 'Vaccination',
    category: 'Preventive Care',
    shortDescription: 'Core and lifestyle immunization protocols including Rabies, DHPPi-L, Parvovirus, and Feline Tricat boosters.',
    fullDescription: 'Protect your companion from life-threatening infectious diseases with cold-chain verified vaccines. Each visit includes a pre-vaccine clinical assessment and an official Sri Lankan veterinary vaccination record update.',
    priceLKR: 4200,
    durationMinutes: 25,
    iconName: 'Syringe',
    highlights: [
      'Pre-vaccination temperature & vitals check',
      'Core canine & feline booster schedules',
      'Official digital & printed immunization log',
    ],
  },
  {
    id: 'srv-grooming',
    name: 'Grooming',
    category: 'Wellness & Grooming',
    shortDescription: 'Hygienic medicated baths, breed-standard coat styling, nail trimming, ear cleaning, and tick-control spa treatments.',
    fullDescription: 'Conducted under veterinary supervision using hypoallergenic, pH-balanced dermal shampoos suited for Sri Lanka’s tropical climate. Ideal for pets with sensitive skin, shedding coats, or anxiety.',
    priceLKR: 5500,
    durationMinutes: 60,
    iconName: 'Scissors',
    highlights: [
      'Warm hydro-massage medicated bath',
      'Safe nail clipping & paw pad tidy',
      'Gentle ear canal cleansing & coat blowout',
    ],
  },
  {
    id: 'srv-dental',
    name: 'Dental Care',
    category: 'Emergency & Dental',
    shortDescription: 'Ultrasonic dental scaling, enamel polishing, gingivitis treatment, and oral surgery for fresher breath and pain-free eating.',
    fullDescription: 'Periodontal disease affects over 75% of pets over age three. We provide thorough oral health assessments, ultrasonic tartar removal, polishing, and safe tooth extractions with full anesthetic monitoring.',
    priceLKR: 6800,
    durationMinutes: 45,
    iconName: 'Sparkles',
    highlights: [
      'Ultrasonic plaque & calculus scaling',
      'Gum pocket & oral lesion examination',
      'Home dental hygiene care kit advice',
    ],
  },
  {
    id: 'srv-surgery',
    name: 'Surgery Consultation',
    category: 'Surgery & Diagnostics',
    shortDescription: 'Pre-operative surgical assessments for spaying/neutering, soft-tissue procedures, lump removals, and orthopedic care.',
    fullDescription: 'Meet with our senior veterinary surgeons to review diagnostic imaging, pre-anesthetic blood panels, surgical risk management, and post-operative recovery protocols tailored to your pet’s age and breed.',
    priceLKR: 5000,
    durationMinutes: 40,
    iconName: 'Activity',
    highlights: [
      'Pre-anesthetic risk & bloodwork evaluation',
      'Detailed surgical & pain management plan',
      'Transparent cost & recovery timeline breakdown',
    ],
  },
  {
    id: 'srv-nutrition',
    name: 'Pet Nutrition Consultation',
    category: 'Wellness & Grooming',
    shortDescription: 'Customized dietary plans for puppy/kitten growth, renal or hepatic support, food allergies, and healthy weight loss.',
    fullDescription: 'Whether you feed commercial kibble, wet food, or home-prepared meals, our clinical nutritionists formulate balanced macro- and micronutrient plans to resolve skin allergies, digestive upset, and obesity.',
    priceLKR: 3000,
    durationMinutes: 30,
    iconName: 'Apple',
    highlights: [
      'Caloric & macronutrient requirement calculation',
      'Elimination diet planning for skin/gut allergies',
      'Life-stage & prescription diet transition guide',
    ],
  },
  {
    id: 'srv-diagnostics',
    name: 'Diagnostic Testing',
    category: 'Surgery & Diagnostics',
    shortDescription: 'In-house hematology, biochemistry panels, tick-fever PCR screening, digital X-rays, and abdominal ultrasound.',
    fullDescription: 'Rapid, accurate diagnostics are the foundation of effective treatment. Our in-house laboratory delivers complete blood counts, organ function profiles, and Babesia/Ehrlichia screening within 45 minutes.',
    priceLKR: 7500,
    durationMinutes: 40,
    iconName: 'Microscope',
    highlights: [
      'Same-day CBC & organ biochemistry results',
      'High-definition digital radiography & ultrasound',
      'Tick-borne blood parasite microscopy & rapid tests',
    ],
  },
  {
    id: 'srv-emergency',
    name: 'Emergency Care',
    category: 'Emergency & Dental',
    shortDescription: 'Immediate triage, trauma stabilization, toxin ingestion treatment, heatstroke care, and critical care monitoring.',
    fullDescription: 'Our dedicated triage bay is equipped with oxygen therapy, intravenous fluid warmers, multiparameter ECG monitors, and emergency antidotes to stabilize acute injuries or sudden illness rapidly.',
    priceLKR: 8500,
    durationMinutes: 45,
    iconName: 'HeartPulse',
    highlights: [
      'Priority rapid triage & vitals stabilization',
      'Oxygen therapy & IV fluid resuscitation',
      'Continuous critical care veterinary monitoring',
    ],
  },
];

export const VETERINARIANS_DATA: Veterinarian[] = [
  {
    id: 'vet-ananya',
    name: 'Dr. Ananya Perera',
    credentials: 'BVSc (Peradeniya), MSc (Small Animal Medicine, UK)',
    specialization: 'Internal Medicine & Preventive Healthcare',
    experienceYears: 12,
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availabilitySummary: 'Mon – Sat · 09:00 AM – 05:00 PM',
    image: CLINIC_IMAGES.vet1,
    bio: 'Dr. Ananya Perera is the Clinical Director and Lead Internal Medicine Specialist at PawCare. With over 12 years of clinical experience in Colombo and London, she specializes in complex internal medicine, endocrine disorders, and geriatric pet wellness.',
    education: [
      'BVSc (Hons) – University of Peradeniya, Sri Lanka',
      'MSc in Clinical Veterinary Medicine – Royal Veterinary College, London',
      'Registered Member – Sri Lanka Veterinary Council (SLVC)',
    ],
    languages: ['English', 'Sinhala', 'Tamil'],
    focusAreas: ['Canine & Feline Internal Medicine', 'Tick-Fever & Tropical Infectious Diseases', 'Senior Pet Preventive Care'],
    isSampleProfile: true,
  },
  {
    id: 'vet-rohan',
    name: 'Dr. Rohan Fernando',
    credentials: 'BVSc, CertSAS (Small Animal Surgery)',
    specialization: 'Soft Tissue & Orthopedic Surgery',
    experienceYears: 15,
    availabilityDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilitySummary: 'Mon, Tue, Thu – Sun · 10:00 AM – 06:30 PM',
    image: CLINIC_IMAGES.vet2,
    bio: 'Dr. Rohan Fernando leads the Surgical & Diagnostic Imaging wing at PawCare. Over his 15-year career, he has performed more than 3,200 successful orthopedic and soft-tissue procedures with a strong focus on minimally invasive techniques and pain-free recovery.',
    education: [
      'BVSc – University of Peradeniya, Sri Lanka',
      'Postgraduate Certificate in Small Animal Surgery – Massey University',
      'Advanced Fellowship in Veterinary Orthopedics & Trauma',
    ],
    languages: ['English', 'Sinhala'],
    focusAreas: ['Cruciate Ligament & Fracture Repair', 'Minimally Invasive Soft Tissue Surgery', 'Digital Radiography & Ultrasound'],
    isSampleProfile: true,
  },
  {
    id: 'vet-dilini',
    name: 'Dr. Dilini Silva',
    credentials: 'BVSc, GPCert (Feline Practice & Dentistry)',
    specialization: 'Feline Medicine & Veterinary Dentistry',
    experienceYears: 8,
    availabilityDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilitySummary: 'Wed – Mon · 09:00 AM – 04:30 PM',
    image: CLINIC_IMAGES.vet3,
    bio: 'Dr. Dilini Silva is a certified Feline-Friendly practitioner and Veterinary Dental Specialist. She designed PawCare’s quiet cat-only examination protocols to ensure anxious cats and small companions experience zero-stress consultations and gentle dental procedures.',
    education: [
      'BVSc – University of Peradeniya, Sri Lanka',
      'ISFM Feline Friendly Handling & Medicine Certification',
      'Continuing Education Diploma in Small Animal Veterinary Dentistry',
    ],
    languages: ['English', 'Sinhala'],
    focusAreas: ['Stress-Free Feline Medicine', 'Periodontal Scaling & Oral Surgery', 'Pediatric Puppy & Kitten Wellness'],
    isSampleProfile: true,
  },
  {
    id: 'vet-kasun',
    name: 'Dr. Kasun Jayawardena',
    credentials: 'BVSc, DipVCN (Clinical Nutrition & Dermatology)',
    specialization: 'Dermatology, Allergies & Clinical Nutrition',
    experienceYears: 9,
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'],
    availabilitySummary: 'Mon – Wed, Fri – Sun · 09:30 AM – 06:00 PM',
    image: CLINIC_IMAGES.vet4,
    bio: 'Dr. Kasun Jayawardena focuses on chronic skin conditions, tropical dermatological allergies, avian care, and evidence-based clinical nutrition. He helps pet parents manage recurring ear infections, food sensitivities, and metabolic health through targeted care.',
    education: [
      'BVSc – University of Peradeniya, Sri Lanka',
      'Diploma in Veterinary Clinical Nutrition & Dermatology',
      'Member of the Sri Lanka Veterinary Association (SLVA)',
    ],
    languages: ['English', 'Sinhala', 'Tamil'],
    focusAreas: ['Chronic Skin & Ear Allergy Management', 'Custom Therapeutic Diet Formulation', 'Avian & Exotic Companion Care'],
    isSampleProfile: true,
  },
];

export const AVAILABLE_TIME_SLOTS: string[] = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
];

export const DEFAULT_CLINIC_CONTACT: ClinicContactConfig = {
  clinicName: 'PawCare – Pet Health & Wellness Center (Sample Clinic Data)',
  addressLine1: 'No. 142, Havelock Road, Thimbirigasyaya',
  addressLine2: 'Colombo 05, Western Province',
  city: 'Colombo',
  country: 'Sri Lanka',
  phonePrimary: '+94 11 258 4920',
  phoneEmergency: '+94 77 890 1122',
  emailGeneral: 'care@pawcareclinic.lk',
  emailAppointments: 'bookings@pawcareclinic.lk',
  openingHoursWeekdays: 'Monday – Friday: 08:30 AM – 07:30 PM',
  openingHoursWeekend: 'Saturday – Sunday: 09:00 AM – 05:30 PM',
  emergencyHours: '24/7 Emergency Triage Unit Open Daily (Including Poya & Public Holidays)',
};

export const TESTIMONIALS_DATA = [
  {
    id: 'test-1',
    ownerName: 'Nadeesha Wickramasinghe',
    role: 'Pet Parent to Bruno (4-year-old Golden Retriever)',
    location: 'Colombo 07, Sri Lanka',
    outcomeMetric: 'Full recovery from tick fever in 10 days',
    quote: 'When Bruno stopped eating and developed a high fever, Dr. Ananya ran in-house blood diagnostics within 30 minutes and started targeted treatment immediately. The clarity, compassion, and follow-up calls made all the difference.',
  },
  {
    id: 'test-2',
    ownerName: 'malith & Shenali Perera',
    role: 'Pet Parents to Mochi (2-year-old Persian Cat)',
    location: 'Nawala, Sri Lanka',
    outcomeMetric: 'Zero-stress dental cleaning & coat care',
    quote: 'Mochi used to panic at clinics, but Dr. Dilini’s quiet feline consultation room and gentle handling kept her completely calm. Booking our time slot online meant zero waiting room stress.',
  },
  {
    id: 'test-3',
    ownerName: 'Arjun Rajapakse',
    role: 'Pet Parent to Rex (7-year-old German Shepherd)',
    location: 'Mount Lavinia, Sri Lanka',
    outcomeMetric: 'Restored mobility after orthopedic consultation',
    quote: 'Dr. Rohan explained Rex’s hip and joint radiographs in plain language and paired surgical guidance with a nutrition plan from Dr. Kasun. Rex is back to his morning walks on the beach.',
  },
];

export function getInitialDemoBookings(): AppointmentBooking[] {
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setDate(now.getDate() + 4);
  const futureDateStr = futureDate.toISOString().split('T')[0];

  const pastDate = new Date(now);
  pastDate.setDate(now.getDate() - 12);
  const pastDateStr = pastDate.toISOString().split('T')[0];

  return [
    {
      id: 'demo-bk-1',
      referenceNumber: 'PC-2026-8419',
      ownerName: 'Kavindi Jayasinghe (Sample Demo Booking)',
      ownerEmail: 'kavindi.demo@example.lk',
      ownerPhone: '+94 77 234 5678',
      petName: 'Biscuit',
      petType: 'Dog',
      breed: 'Golden Retriever',
      petAge: '3 Years',
      serviceId: 'srv-checkup',
      serviceName: 'General Health Checkups',
      servicePriceLKR: 3500,
      vetId: 'vet-ananya',
      vetName: 'Dr. Ananya Perera',
      date: futureDateStr,
      timeSlot: '10:00 AM',
      reason: 'Semi-annual wellness checkup and heartworm preventive refill',
      notes: 'Friendly with vets, loves peanut butter treats.',
      status: 'Confirmed',
      createdAt: new Date(now.getTime() - 86400000).toISOString(),
    },
    {
      id: 'demo-bk-2',
      referenceNumber: 'PC-2026-6104',
      ownerName: 'Kavindi Jayasinghe (Sample Demo Booking)',
      ownerEmail: 'kavindi.demo@example.lk',
      ownerPhone: '+94 77 234 5678',
      petName: 'Luna',
      petType: 'Cat',
      breed: 'Domestic Shorthair',
      petAge: '1.5 Years',
      serviceId: 'srv-vaccination',
      serviceName: 'Vaccination',
      servicePriceLKR: 4200,
      vetId: 'vet-dilini',
      vetName: 'Dr. Dilini Silva',
      date: pastDateStr,
      timeSlot: '02:30 PM',
      reason: 'Annual Feline Tricat & Rabies booster vaccination',
      notes: 'Prefers to stay inside the bottom half of her carrier during exam.',
      status: 'Completed',
      createdAt: new Date(now.getTime() - 86400000 * 14).toISOString(),
    },
  ];
}

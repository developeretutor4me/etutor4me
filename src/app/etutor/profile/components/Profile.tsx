import { Check, ChevronDown, ChevronUp, Cross, X, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import infoiconfill from "../../../../../public/infoiconfill.svg";
import addicon from "../../../../../public/addQualificationIcon.svg";
import addicon2 from "../../../../../public/addicon2.svg";
import bluefoldericon from "../../../../../public/blueFolderIconFilled.svg";
import downloadicon from "../../../../../public/downloadIconDownARrow.svg";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
export interface Teacher {
  user: string; // ObjectId reference to the User model
  acceptsTrialSession?: boolean;
  contactInformation: {
    country?: string;
    countryOfresident?: string;
    firstName: string;
    lastName?: string;
    zipCode?: string;
    phone?: string;
    streetname?: string;
    shippingAddress?: string;
    city?: string;
    postcode?: string;
    email: string;
  };
  education: {
    college: string;
    degree: string;
    major: string;
    graduation?: any;
    graduationSchool?: string;
    graduationCountry?: string;
    highestDegree?: string;
    school?: string;
  };
  DOB: {
    day?: string;
    month?: string;
    year?: string;
  };
  currentJob?: string;
  timeZone?: string;
  gender?: string;
  VideoIntroduction?: string;
  aboutyou?: string;
  YourEducation?: string;
  experience: {
    experienceWithSpecialNeedsStudent?: string[];
    tutoringExperience?: string;
    internationalExperience?: string;
    moreaboutProfessionalExperience?: string;
    hasExperience: boolean;
    tutoringLevel: string[];
    subjectsTutored: string[];
    languages: string[];
    instructionTypes: string[];
    availableHours: string;
    startDate: any;
    generalAvailability: any;
    hasTeachingExperience: boolean;
    is18OrAbove: boolean;
  };
  bankDetails?: {
    accountholder?: string;
    IBAN?: string;
    BIC?: string;
  };
  currentMonthRegularSession?: number;
  currentMonthGroupSession?: number;
  TotalGroupSession?: number;
  TotalRegularSession?: number;
  totalbooking?: number;
  level?: number;
  badge?: string;
  EarnedThisMonth?: number;
  EarnedLastMonth?: number;
  TotalEarning?: number;
  isApproved?: boolean;
}

const subjectOptions = [
  { value: "Mathematics", label: "Mathematics" },
  { value: "Algebra", label: "Algebra" },
  { value: "Geometry", label: "Geometry" },
  { value: "Calculus", label: "Calculus" },
  { value: "Trigonometry", label: "Trigonometry" },
  { value: "Statistics", label: "Statistics" },
  { value: "Science", label: "Science" },
  { value: "Biology", label: "Biology" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Physics", label: "Physics" },
  { value: "Environmental Science", label: "Environmental Science" },
  { value: "Earth Science", label: "Earth Science" },
  { value: "English Language Arts", label: "English Language Arts" },
  { value: "Grammar", label: "Grammar" },
  { value: "Literature", label: "Literature" },
  { value: "Writing", label: "Writing" },
  { value: "Reading Comprehension", label: "Reading Comprehension" },
  { value: "Social Studies", label: "Social Studies" },
  {
    value: "History (World, U.S., Ancient)",
    label: "History (World, U.S., Ancient)",
  },
  { value: "Geography", label: "Geography" },
  { value: "Economics", label: "Economics" },
  { value: "Political Science", label: "Political Science" },
  { value: "Foreign Languages", label: "Foreign Languages" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Chinese (Mandarin)", label: "Chinese (Mandarin)" },
  { value: "Japanese", label: "Japanese" },
  { value: "Arabic", label: "Arabic" },
  { value: "Russian", label: "Russian" },
  {
    value: "Specialized & Advanced Subjects",
    label: "Specialized & Advanced Subjects",
  },
  { value: "Advanced Mathematics", label: "Advanced Mathematics" },
  { value: "Differential Equations", label: "Differential Equations" },
  { value: "Linear Algebra", label: "Linear Algebra" },
  { value: "Discrete Math", label: "Discrete Math" },
  {
    value: "Computer Science & Technology",
    label: "Computer Science & Technology",
  },
  {
    value: "Programming (Python, Java, C++)",
    label: "Programming (Python, Java, C++)",
  },
  { value: "Web Development", label: "Web Development" },
  { value: "Data Science", label: "Data Science" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "AI and Machine Learning", label: "AI and Machine Learning" },
  { value: "Business & Economics", label: "Business & Economics" },
  { value: "Accounting", label: "Accounting" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
  { value: "Entrepreneurship", label: "Entrepreneurship" },
  {
    value: "Microeconomics/Macroeconomics",
    label: "Microeconomics/Macroeconomics",
  },
];
const PurposeOfAttachment = [
  { value: "Degree certificate", label: "Degree certificate" },
  { value: "Grade Transcript", label: "Grade Transcript" },
  { value: "Professional Certification", label: "Professional Certification" },
  { value: "Other", label: "Other" },
];



const subjectLevelOptions = [
  
  { value: "Pre-Kindergarten", label: "Pre-Kindergarten" },
  { value: "Kindergarten-2nd grade", label: "Kindergarten-2nd grade" },
  { value: "3rd-5th Grade", label: "3rd-5th Grade" },
  { value: "Middle School", label: "Middle School" },
  { value: "High School", label: "High School" },
  { value: "College", label: "College" },
  { value: "Graduate", label: "Graduate" },
  { value: "Adult", label: "Adult" },
];


const experienceoptions = [
 
  { value: "Autism Spectrum Disorder (ASD)", label: "Autism Spectrum Disorder (ASD)" },
  { value: "Attention Deficit Hyperactivity Disorder (ADHD)", label: "Attention Deficit Hyperactivity Disorder (ADHD)" },
  { value: "Dyslexia", label: "Dyslexia" },
  { value: "Dyscalculia", label: "Dyscalculia" },
  { value: "Dysgraphia", label: "Dysgraphia" },
  { value: "Intellectual Disabilities", label: "Intellectual Disabilities" },
  { value: "Speech and Language Disorders", label: "Speech and Language Disorders" },
  { value: "Emotional and Behavioral Disorders", label: "Emotional and Behavioral Disorders" },
  { value: "Hearing Impairments", label: "Hearing Impairments" },
  { value: "Visual Impairments", label: "Visual Impairments" },
  { value: "Traumatic Brain Injury (TBI)", label: "Traumatic Brain Injury (TBI)" },
  { value: "Developmental Coordination Disorder (Dyspraxia)", label: "Developmental Coordination Disorder (Dyspraxia)" },
  { value: "Sensory Processing Disorder", label: "Sensory Processing Disorder" },
  { value: "Multiple Disabilities", label: "Multiple Disabilities" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
const countryoptions = [
  { value: "USA", label: "USA" },
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Ireland", label: "Ireland" },
  { value: "Canada", label: "Canada" },
  { value: "Malta", label: "Malta" },
  { value: "Belize", label: "Belize" },
  { value: "France", label: "France" },
  { value: "Canada (especially Quebec)", label: "Canada (especially Quebec)" },
  { value: "Belgium", label: "Belgium" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Monaco", label: "Monaco" },
  { value: "Haiti", label: "Haiti" },
  { value: "Germany", label: "Germany" },
  { value: "Austria", label: "Austria" },
  { value: "Liechtenstein", label: "Liechtenstein" },
];
const timezoneoptions = [
  { label: "Baker Island, GMT -12:00", value: "Baker Island, GMT -12:00" },
  { label: "American Samoa, GMT -11:00", value: "American Samoa, GMT -11:00" },
  { label: "Hawaii, GMT -10:00", value: "Hawaii, GMT -10:00" },
  { label: "Alaska, GMT -09:00", value: "Alaska, GMT -09:00" },
  {
    label: "Pacific Time (US & Canada), GMT -08:00",
    value: "Pacific Time (US & Canada), GMT -08:00",
  },
  {
    label: "Mountain Time (US & Canada), GMT -07:00",
    value: "Mountain Time (US & Canada), GMT -07:00",
  },
  {
    label: "Central Time (US & Canada), GMT -06:00",
    value: "Central Time (US & Canada), GMT -06:00",
  },
  {
    label: "Eastern Time (US & Canada), GMT -05:00",
    value: "Eastern Time (US & Canada), GMT -05:00",
  },
  { label: "Caracas, GMT -04:00", value: "Caracas, GMT -04:00" },
  { label: "Buenos Aires, GMT -03:00", value: "Buenos Aires, GMT -03:00" },
  { label: "South Georgia, GMT -02:00", value: "South Georgia, GMT -02:00" },
  { label: "Cape Verde, GMT -01:00", value: "Cape Verde, GMT -01:00" },
  { label: "London, GMT ±00:00", value: "London, GMT ±00:00" },
  { label: "Berlin, GMT +01:00", value: "Berlin, GMT +01:00" },
  { label: "Cairo, GMT +02:00", value: "Cairo, GMT +02:00" },
  { label: "Moscow, GMT +03:00", value: "Moscow, GMT +03:00" },
  { label: "Dubai, GMT +04:00", value: "Dubai, GMT +04:00" },
  { label: "Islamabad, GMT +05:00", value: "Islamabad, GMT +05:00" },
  {
    label: "India Standard Time, GMT +05:30",
    value: "India Standard Time, GMT +05:30",
  },
  { label: "Nepal, GMT +05:45", value: "Nepal, GMT +05:45" },
  { label: "Dhaka, GMT +06:00", value: "Dhaka, GMT +06:00" },
  { label: "Myanmar, GMT +06:30", value: "Myanmar, GMT +06:30" },
  { label: "Bangkok, GMT +07:00", value: "Bangkok, GMT +07:00" },
  { label: "Beijing, GMT +08:00", value: "Beijing, GMT +08:00" },
  {
    label: "Australia Central Time, GMT +08:45",
    value: "Australia Central Time, GMT +08:45",
  },
  { label: "Tokyo, GMT +09:00", value: "Tokyo, GMT +09:00" },
  {
    label: "Australia Central Time, GMT +09:30",
    value: "Australia Central Time, GMT +09:30",
  },
  { label: "Sydney, GMT +10:00", value: "Sydney, GMT +10:00" },
  {
    label: "Lord Howe Island, GMT +10:30",
    value: "Lord Howe Island, GMT +10:30",
  },
  {
    label: "Solomon Islands, GMT +11:00",
    value: "Solomon Islands, GMT +11:00",
  },
  { label: "Norfolk Island, GMT +11:30", value: "Norfolk Island, GMT +11:30" },
  { label: "Auckland, GMT +12:00", value: "Auckland, GMT +12:00" },
  {
    label: "Chatham Islands, GMT +12:45",
    value: "Chatham Islands, GMT +12:45",
  },
  { label: "Nuku'alofa, GMT +13:00", value: "Nuku'alofa, GMT +13:00" },
  { label: "Kiritimati, GMT +14:00", value: "Kiritimati, GMT +14:00" },
];
function Profile() {
  const { toast } = useToast();
  const { data: session,update } = useSession();
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [error, setError] = useState<string | null>(null);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isSubjectLEVELDropdownOpen, setIsSubjectLEVELDropdownOpen] =
    useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectsLEVEL, setSelectedSubjectsLEVEL] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [teacher, setTeacher] = useState<Teacher>();
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [isAcademicCountryopen, setisAcademicCountryopen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCountry, setselectedCountry] = useState("");
  const [selectedTimezone, setselectedTimezone] = useState("");
  const [selectedAcademicCountry, setselectedAcademicCountry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [acceptsTrialSession, setAcceptsTrialSession] = useState(false);

  // Contact Information
  const [country, setCountry] = useState("");
  const [countryOfResident, setCountryOfResident] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [streetName, setStreetName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");

  // Education
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [graduation, setGraduation] = useState("");
  const [graduationSchool, setGraduationSchool] = useState("");
  const [graduationCountry, setGraduationCountry] = useState("");
  const [highestDegree, setHighestDegree] = useState("");
  const [school, setSchool] = useState("");

  // DOB
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Miscellaneous Information
  const [currentJob, setCurrentJob] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [gender, setGender] = useState("");
  const [videoIntroduction, setVideoIntroduction] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [yourEducation, setYourEducation] = useState("");

  // Experience
  const [
    experienceWithSpecialNeedsStudent,
    setExperienceWithSpecialNeedsStudent,
  ] = useState([""]);
  const [tutoringExperience, setTutoringExperience] = useState("");
  const [internationalExperience, setInternationalExperience] = useState("");
  const [moreAboutProfessionalExperience, setMoreAboutProfessionalExperience] =
    useState("");
  const [hasExperience, setHasExperience] = useState(false);
  const [tutoringLevel, setTutoringLevel] = useState([""]);
  const [subjectsTutored, setSubjectsTutored] = useState([""]);
  const [instructionTypes, setInstructionTypes] = useState([""]);
  const [availableHours, setAvailableHours] = useState("");
  const [startDate, setStartDate] = useState("");
  const [generalAvailability, setGeneralAvailability] = useState([""]);
  const [hasTeachingExperience, setHasTeachingExperience] = useState(false);
  const [is18OrAbove, setIs18OrAbove] = useState(false);
  const [accountHolder, setAccountHolder] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [BIC, setBIC] = useState("");
  const [currentMonthRegularSession, setCurrentMonthRegularSession] =
    useState(0);
  const [currentMonthGroupSession, setCurrentMonthGroupSession] = useState(0);
  const [totalGroupSession, setTotalGroupSession] = useState(0);
  const [totalRegularSession, setTotalRegularSession] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [level, setLevel] = useState(0);
  const [badge, setBadge] = useState(
    "https://cdn4.vectorstock.com/i/1000x1000/85/48/emblem-badge-ribbon-vector-14398548.jpg"
  );
  const [earnedThisMonth, setEarnedThisMonth] = useState(0);
  const [earnedLastMonth, setEarnedLastMonth] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [languages, setLanguages] = useState([""]);
  const [showNewInput, setShowNewInput] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubjectToVerifyDropdownOpen, setIsSubjectToVerifyDropdownOpen] =
    useState(false);
  const [selectedSubjectToVerifys, setSelectedSubjectToVerifys] = useState("");
  const [
    isPurposeOfAttechmentDropdownOpen,
    setIsPurposeOfAttechmentDropdownOpen,
  ] = useState(false);
  const [selectedPurposeOfAttechments, setSelectedPurposeOfAttechments] =
    useState("");
  const [profilePicture, setprofilePicture] = useState("")



    // qualification approval-------------------------
    const [tutorId, setTutorId] = useState('');
  const [subject, setSubject] = useState('');
  const [purpose, setPurpose] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [pictureuploadloading, setpictureuploadloading] = useState(false)  
  const [image, setImage] = useState<File | null>(null); // State to hold the selected image
  const [isUploading, setIsUploading] = useState(false); // State to show the uploading status
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(""); 





  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setUploadedUrls([]);



    const formData = new FormData();
    formData.append('userid', session?.user.id);
    formData.append('subject', selectedSubjectToVerifys);
    formData.append('purpose', selectedPurposeOfAttechments);
    // @ts-ignore
    formData.append('teacher', teacher?._id);
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('/api/qualification-approval', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedUrls(result.uploadedFiles.map((file: { fileUrl: string }) => file.fileUrl));

        toast({
          title: "Success",
          description: "Your files have been successfully submitted for verification. Thank you!",
          variant: "default",
        });
        setIsPopupOpen(false)
      } else {
        setErrorMessage(result.error || 'Failed to upload files');
      }
    } catch (error) {
      toast({
        title: "!",
        description: `'Error uploading files:' ${error}`,
        variant: "destructive",
      });
    
    } finally {
      setIsSubmitting(false);
      
      setSelectedSubjectToVerifys("")
      setSelectedPurposeOfAttechments("")
      setFiles([])
    }
  };






    // -------------------------------------------






















  // const handleFileChange = (event: any) => {
  //   //@ts-ignore
  //   setFiles([...files, ...event.target.files]);
  // };

  const removeFile = (index: any) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const togglePurposeOfAttechmentDropdown = () => {
    setIsPurposeOfAttechmentDropdownOpen(!isPurposeOfAttechmentDropdownOpen);
  };

  const handlePurposeOfAttechmentClick = (PurposeOfAttechment: string) => {
    setSelectedPurposeOfAttechments(PurposeOfAttechment);
    setIsPurposeOfAttechmentDropdownOpen(false);
  };

  const toggleSubjectToVerifyDropdown = () => {
    setIsSubjectToVerifyDropdownOpen(!isSubjectToVerifyDropdownOpen);
  };

  const handleSubjectToVerifyClick = (SubjectToVerify: string) => {
    setSelectedSubjectToVerifys(SubjectToVerify);
    setIsSubjectToVerifyDropdownOpen(false);
  };

  const handleAddLanguage = () => {
    if (!isEditing || languages.length >= 4) return;
    setShowNewInput(true);
  };

  const handleSubmitLanguage = () => {
    if (newLanguage.trim() && languages.length < 4) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage("");
      // Don't hide the input - allow adding another language
      if (languages.length < 3) {
        // Only keep input visible if we haven't reached 4 languages yet
        setShowNewInput(true);
      } else {
        setShowNewInput(false);
      }
    }
  };

  const handleDeleteLanguage = (indexToDelete: any) => {
    if (!isEditing) return;
    setLanguages(languages.filter((_, index) => index !== indexToDelete));
  };

 

  // update function-------------------------
  const handleSave = async () => {
    setIsEditing(false);
    try {
      const body = {
        acceptsTrialSession: acceptsTrialSession,
        contactInformation: {
          country: selectedCountry,
          countryOfresident: countryOfResident,
          firstName: firstName,
          lastName: lastName,
          zipCode: zipCode,
          phone: phone,
          streetname: streetName,
          shippingAddress: shippingAddress,
          city: city,
          postcode: postcode,
          email: email,
        },
        education: {
          college: college,
          degree: degree,
          major: major,
          graduation: graduation,
          graduationSchool: graduationSchool,
          graduationCountry: selectedAcademicCountry,
          highestDegree: highestDegree,
          school: school,
        },
        DOB: {
          day: day,
          month: month,
          year: year,
        },
        currentJob: currentJob,
        timeZone: selectedTimezone,
        gender: selectedGender,
        VideoIntroduction: videoIntroduction,
        aboutyou: aboutYou,
        YourEducation: yourEducation,
        experience: {
          experienceWithSpecialNeedsStudent: selectedExperience,
          tutoringExperience: tutoringExperience,
          internationalExperience: internationalExperience,
          moreaboutProfessionalExperience: moreAboutProfessionalExperience,
          hasExperience: hasExperience,
          tutoringLevel: selectedSubjectsLEVEL,
          subjectsTutored: selectedSubjects,
          languages: languages,
          instructionTypes: instructionTypes,
          availableHours: availableHours,
          startDate: startDate,
          generalAvailability: generalAvailability,
          hasTeachingExperience: hasTeachingExperience,
          is18OrAbove: is18OrAbove,
        },
        bankDetails: {
          accountholder: accountHolder,
          IBAN: IBAN,
          BIC: BIC,
        },
      };

      const response = await fetch("/api/Teacher-Apis/Update-Teacher-Data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
      
        toast({
          title: "Updated successfully!",
          description: "",
          variant: "default",
        });
       
        
      } else {
        const error = await response.json();
   
        toast({
          title:`Error: ${error.error}`,
          description: "",
          variant: "destructive",
        });
      }
    } catch (error) {
     
      toast({
        title:`Failed to update teacher data.`,
        description: "",
        variant: "destructive",
      });
    }
  };

  
  useEffect(() => {
    if (teacher && isEditing !== true) {

      // Contact Information

      // @ts-ignore
      setprofilePicture(teacher?.user?.profilePicture)
      setselectedCountry(teacher?.contactInformation?.country || "");
      setCountryOfResident(
        teacher?.contactInformation?.countryOfresident || ""
      );
      setFirstName(teacher?.contactInformation?.firstName || "");
      setLastName(teacher?.contactInformation?.lastName || "");
      setZipCode(teacher?.contactInformation?.zipCode || "");
      setPhone(teacher?.contactInformation?.phone || "");
      setStreetName(teacher?.contactInformation?.streetname || "");
      setShippingAddress(teacher?.contactInformation?.shippingAddress || "");
      setCity(teacher?.contactInformation?.city || "");
      setPostcode(teacher?.contactInformation?.postcode || "");
      //@ts-ignore
      setEmail(teacher?.user?.email || "");

      // Education
      setCollege(teacher?.education?.college || "");
      setDegree(teacher?.education?.degree || "");
      setMajor(teacher?.education?.major || "");
      setGraduation(teacher?.education?.graduation || "");
      setGraduationSchool(teacher?.education?.graduationSchool || "");
      setselectedAcademicCountry(teacher?.education?.graduationCountry || "");
      setHighestDegree(teacher?.education?.highestDegree || "");
      setSchool(teacher?.education?.school || "");

      // DOB
      setDay(teacher?.DOB?.day || "");
      setMonth(teacher?.DOB?.month || "");
      setYear(teacher?.DOB?.year || "");

      // Miscellaneous Information
      setCurrentJob(teacher?.currentJob || "");
      setselectedTimezone(teacher?.timeZone || "");
      setSelectedGender(teacher?.gender || "");
      setVideoIntroduction(teacher?.VideoIntroduction || "");
      setAboutYou(teacher?.aboutyou || "");
      setYourEducation(teacher?.YourEducation || "");

      // Experience
      setSelectedExperience(
        //@ts-ignore
        teacher?.experience?.experienceWithSpecialNeedsStudent || []
      );
      setTutoringExperience(teacher?.experience?.tutoringExperience || "");
      setInternationalExperience(
        teacher?.experience?.internationalExperience || ""
      );
      setMoreAboutProfessionalExperience(
        teacher?.experience?.moreaboutProfessionalExperience || ""
      );
      setHasExperience(teacher?.experience?.hasExperience || false);
      //@ts-ignore
      setSelectedSubjectsLEVEL(teacher?.experience?.tutoringLevel || []);
      //@ts-ignore
      setSelectedSubjects(teacher?.experience?.subjectsTutored || []);
      setLanguages(teacher?.experience?.languages || [""]);
      setInstructionTypes(teacher?.experience?.instructionTypes || []);
      setAvailableHours(teacher?.experience?.availableHours || "");
      setStartDate(teacher?.experience?.startDate || "");
      setGeneralAvailability(teacher?.experience?.generalAvailability || "");
      setHasTeachingExperience(
        teacher?.experience?.hasTeachingExperience || false
      );
      setIs18OrAbove(teacher?.experience?.is18OrAbove || false);

      // Bank Details
      setAccountHolder(teacher?.bankDetails?.accountholder || "");
      setIBAN(teacher?.bankDetails?.IBAN || "");
      setBIC(teacher?.bankDetails?.BIC || "");

      // Stats
      setCurrentMonthRegularSession(teacher?.currentMonthRegularSession || 0);
      setCurrentMonthGroupSession(teacher?.currentMonthGroupSession || 0);
      setTotalGroupSession(teacher?.TotalGroupSession || 0);
      setTotalRegularSession(teacher?.TotalRegularSession || 0);
      setTotalBooking(teacher?.totalbooking || 0);
      setLevel(teacher?.level || 0);
      setBadge(
        teacher?.badge ||
          "https://cdn4.vectorstock.com/i/1000x1000/85/48/emblem-badge-ribbon-vector-14398548.jpg"
      );
      setEarnedThisMonth(teacher?.EarnedThisMonth || 0);
      setEarnedLastMonth(teacher?.EarnedLastMonth || 0);
      setTotalEarning(teacher?.TotalEarning || 0);

      // Approval
      setIsApproved(teacher?.isApproved || false);
    }
  }, [teacher, activeTab]);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const toggleSubjectDropdown = () => {
    if (isEditing === true) {
      setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
    }
  };
  const toggleSubjectLEVELDropdown = () => {
    if (isEditing === true) {
      setIsSubjectLEVELDropdownOpen(!isSubjectLEVELDropdownOpen);
    }
  };
  const toggleExperienceWithSpecialNeeds = () => {
    if (isEditing === true) {
      setIsExperienceOpen(!isExperienceOpen);
    }
  };

  const handleSubjectClick = (subject: string) => {
    // @ts-ignore
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
    } else {
      // @ts-ignore
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };









  
  const handleSubjectLEVELClick = (subject: string) => {
    // @ts-ignore
    if (selectedSubjectsLEVEL.includes(subject)) {
      setSelectedSubjectsLEVEL(
        selectedSubjectsLEVEL.filter((item) => item !== subject)
      );
    } else {
      // @ts-ignore
      setSelectedSubjectsLEVEL([...selectedSubjectsLEVEL, subject]);
    }
  };
  const handleExperienceClick = (subject: string) => {
    // @ts-ignore
    if (selectedExperience.includes(subject)) {
      setSelectedExperience(
        selectedExperience.filter((item) => item !== subject)
      );
    } else {
      // @ts-ignore
      setSelectedExperience([...selectedExperience, subject]);
    }
  };
  const removeSubject = (subject: never) => {
    if (isEditing === true) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
    }
  };
  const removeSubjectLEVEL = (subject: never) => {
    if (isEditing === true) {
      setSelectedSubjectsLEVEL(
        selectedSubjectsLEVEL.filter((item) => item !== subject)
      );
    }
  };
  const removeExperience = (subject: never) => {
    setSelectedExperience(
      selectedExperience.filter((item) => item !== subject)
    );
  };

  const toggleGenderDropdown = () => {
    if (isEditing === true) {
      setIsGenderOpen(!isGenderOpen);
    }
  };
  const toggleCountryDropdown = () => {
    if (isEditing) {
      setIsCountryOpen(!isCountryOpen);
    }
  };
  const toggleTimezoneDropdown = () => {
    if(isEditing){

      setIsTimezoneOpen(!isTimezoneOpen);
    }
  };
  const toggleAcedmicCountrydown = () => {
    if(isEditing){

      setisAcademicCountryopen(!isAcademicCountryopen);
    }
  };

  const handleGenderClick = (value: string) => {
    setSelectedGender(value); // Update the selected gender state
    setIsGenderOpen(false); // Close the gender dropdown
  };
  const handleCountryClick = (value: string) => {
    setselectedCountry(value); // Update the selected gender state
    setIsCountryOpen(false); // Close the gender dropdown
  };
  const handletimezoneClick = (value: string) => {
    setselectedTimezone(value); // Update the selected gender state
    setIsTimezoneOpen(false); // Close the gender dropdown
  };
  const handleAcademicCountryClick = (value: string) => {
    setselectedAcademicCountry(value); // Update the selected gender state
    setisAcademicCountryopen(false); // Close the gender dropdown
  };
  const tabs = [
    { id: "GENERAL", label: "GENERAL" },
    { id: "CONTACTINFORMATION", label: "CONTACT INFORMATION" },
    { id: "PROFESSIONALEXPERIENCE", label: "PROFESSIONAL EXPERIENCE" },
    { id: "ACADEMICBACKGROUND", label: "ACADEMIC BACKGROUND" },
  ];
  const getTabColor = (tabId: string) => {
    if (activeTab === "GENERAL") {
      if (tabId === "CONTACTINFORMATION") return "#B4A5D7";
      if (tabId === "PROFESSIONALEXPERIENCE") return "#6B5692";
      if (tabId === "ACADEMICBACKGROUND") return "#473171";
    } else if (activeTab === "CONTACTINFORMATION") {
      if (tabId === "GENERAL") return "#473171";
      if (tabId === "PROFESSIONALEXPERIENCE") return "#B4A5D7";
      if (tabId === "ACADEMICBACKGROUND") return "#6B5692";
    } else if (activeTab === "PROFESSIONALEXPERIENCE") {
      if (tabId === "GENERAL") return "#6B5692";
      if (tabId === "CONTACTINFORMATION") return "#473171";
      if (tabId === "ACADEMICBACKGROUND") return "#B4A5D7";
    } else if (activeTab === "ACADEMICBACKGROUND") {
      if (tabId === "GENERAL") return "#B4A5D7";
      if (tabId === "CONTACTINFORMATION") return "#6B5692";
      if (tabId === "PROFESSIONALEXPERIENCE") return "#473171";
    }
    return "#EDE8FA"; // Active tab color
  };

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Teacher not found or internal server error");
    }
    return response.json();
  };

  // Use SWR hook
  const { data: teacherData, isLoading } = useSWR(
    "/api/Teacher-Apis/teacher-data",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: (data: any) => {
        setTeacher(data);
      },
      onError: (err: any) => {
        setError(err.message);
      },
    }
  );




  // Handle the image selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
   if (file) {
     setImage(file);
     setError(""); // Reset any previous error
   }
 };

 // Handle image upload
 const handleUpload = async () => {
   setpictureuploadloading(true)
   if (!image) {
     setError("Please select an image first.");
     return;
   }

   const reader = new FileReader();
   reader.onloadend = async () => {
     const imageBase64 = reader.result as string;

     setIsUploading(true); // Show the uploading status

     try {
       // Call the API to upload the image to S3 and store the URL in the database
       const response = await fetch('/api/upload-profile-picture', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           userId: session?.user.id,
           imageBase64: imageBase64.split(',')[1], // Send only base64 data (not the prefix)
         }),
       });

       const data = await response.json();

       if (response.ok) {
         setImage(null)
         // Successfully uploaded the image, update the profile picture URL
         setUploadedImage(data.profilePictureUrl);
         setpictureuploadloading(false)
       } else {
         setImage(null)
         setpictureuploadloading(false)
         setError(data.message || 'Failed to upload the image.');
       }
     } catch (error) {
       setImage(null)
       setpictureuploadloading(false)
       console.error("Error uploading profile picture:", error);
       setError("An error occurred while uploading the image.");
     } finally {
       setIsUploading(false); // Hide the uploading status
     }
   };

   reader.readAsDataURL(image); // Convert the image file to base64
 };









  return (
    <div className=" h-fit w-full -mt-1 rounded-tl-3xl flex mb-12 pb-12   ">
      <div className="w-full    rounded-3xl  relative h-full scrollbar-none p-0 m-0">
        <div className="flex justify-between items-start  w-full">
          <div className=" grid grid-cols-4   rounded-tl-3xl rounded-tr-3xl h-10 sm:h-[84px] w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center flex-nowrap  font-normal box-border sm:font-bold text-xs px-2  sm:text-lg  transition-all
            ${tab.id === "GENERAL" && "rounded-tl-3xl"}
            ${tab.id === "ACADEMICBACKGROUND" && "rounded-tr-3xl"}
            ${
              tab.id === activeTab
                ? "bg-[#EDE8FA] text-[#685AAD] transition-all"
                : `text-white transition-all`
            }`}
                style={{ backgroundColor: getTabColor(tab.id) }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className=" rounded-tl-3xl rounded-tr-3xl h-10 sm:h-[84px] w-[6.8%] hidden custom-2xl:block"></div>
        </div>

        <div
          className={`px-5 sm:px-0 sm:pl-10 custom-xl:pl-20 sm:pr-10 custom-xl:pr-16 py-6 custom-xl:py-12  custom-2xl:rounded-tr-3xl  bg-[#EDE8FA] h-full rounded-b-3xl`}
        >
          {activeTab === "GENERAL" && (
            <div className="  ">
              {/* first name and image dive */}
              <div className=" mt-1.5 flex custom-xl:items-center flex-col custom-xl:flex-row  gap-4 custom-xl:gap-11 ">
                <div className="img h-[9rem] w-[9rem]  rounded-full flex items-center justify-center overflow-hidden">
                  <img src={uploadedImage || profilePicture} alt="" />
                </div>
                <div className="name flex flex-col items-start  ">
                  <h1 className="uppercase text-3xl font-bold text-[#685AAD]">
                    {firstName}
                  </h1>
                  <span className="text-xl  mb-5 text-[#685AAD]">
                    
                    eTutor since:{
                    // @ts-ignore
                    new Date(teacher?.user?.createdAt).toLocaleDateString() || ""}

                  </span>
                  {image ?(
                <button
                className="w-full sm:w-auto py-1 px-9 mt-6 text-base custom-2xl:text-base rounded-sm bg-[#8358F7] hover:bg-[#4a3683] capitalize hover:bg-opacity-90 transition-colors"
                onClick={()=>{
                  handleUpload()
                }}
                >
                  {pictureuploadloading ? "wait...":"upload"} 
                  
                  </button>
              ):(

                  <button className="px-7 text-white rounded-sm py-0.5 bg-[#FC7777] relative">
                    edit image
                    <input
                type="file"
                accept="image/*"
                onChange={handleImageChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
                  </button>
              )}
                </div>
              </div>

              {/* name last name div */}
              <div className="flex mt-12 pt-0.5 w-full sm:max-w-[48.7rem] justify-between flex-wrap gap-4">
                <div className="sm:max-w-[17rem] w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    First name <span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>
                <div className="sm:max-w-[17rem] w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Last name <span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* birthday div */}

              <div className="mt-16 pt-1   ">
                <h1 className=" text-2xl font-bold text-[#685AAD]">
                  When is your birthday?
                </h1>
                <div className="mt-6 flex justify-between   flex-wrap ">
                  <div className="sm:max-w-[17rem] w-full">
                    <label className="text-lg sm:text-xl font-semibold text-[#685AAD]">
                      Day <span className="text-[#FC7777]">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                      value={day}
                      onChange={(e) => {
                        setDay(e.target.value);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="sm:max-w-[17rem] w-full">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                      Month <span className="text-[#FC7777]">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                      value={month}
                      onChange={(e) => {
                        setMonth(e.target.value);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="sm:max-w-[17rem] w-full">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                      Year <span className="text-[#FC7777]">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex mt-11  justify-between items-start sm:max-w-[57.5rem] w-full gap-4 flex-wrap">
                  {/* gender select */}

                  <div className="w-full sm:max-w-[25.8rem] mt-4">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                      Gender <span className="text-[#FC7777]">*</span>
                    </label>
                    <div className="relative  select-none mt-2">
                      <div
                        className={`w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2 rounded-lg cursor-pointer flex justify-between items-center`}
                        onClick={toggleGenderDropdown}
                      >
                        <span>{selectedGender || "select gender"}</span>

                        {isGenderOpen ? (
                          <ChevronUp size={22} className="text-white" />
                        ) : (
                          <ChevronDown size={22} className="text-white" />
                        )}
                      </div>
                      {isGenderOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-2">
                          {genderOptions.map((gender) => (
                            <div
                              key={gender.value}
                              className="py-2 text-lg  border-b px-3 hover:cursor-pointer last:border-b-0  w-[80%] mx-auto"
                              onClick={() => handleGenderClick(gender.value)}
                            >
                              {gender.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* subject select */}
                  <div className="w-full sm:max-w-[25.8rem] mt-4">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                      Subjects you teach{" "}
                      <span className="text-[#FC7777]">*</span>
                    </label>

                    <div className="relative  select-none mt-2 ">
                      <div
                        className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-1 rounded-lg cursor-pointer flex justify-between items-center"
                        onClick={toggleSubjectDropdown}
                      >
                        <span className="my-1">
                          {selectedSubjects.length > 0
                            ? `${selectedSubjects.length} selected`
                            : "select subject(s)"}
                        </span>
                        {isSubjectDropdownOpen ? (
                          <ChevronUp size={22} className="text-white " />
                        ) : (
                          <ChevronDown size={22} className="text-white " />
                        )}
                      </div>

                      {isSubjectDropdownOpen && (
                        <div
                          onMouseLeave={() => {
                            setIsSubjectDropdownOpen(false);
                          }}
                          className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                        >
                          <div
                            id="style-2"
                            className="max-h-[16.4rem] overflow-y-scroll  "
                          >
                            {subjectOptions.map((subject) => (
                              <div
                                key={subject.value}
                                className=" py-2 cursor-pointer flex items-center"
                                onClick={() =>
                                  handleSubjectClick(subject.value)
                                }
                              >
                                <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[15rem] truncate">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      checked={selectedSubjects.includes(
                                        //@ts-ignore
                                        subject.value
                                      )}
                                      onChange={() => {}}
                                      className="absolute opacity-0 cursor-pointer"
                                    />
                                    <div
                                      className={`h-5 w-5 rounded-sm border border-white hover:bg-[#a394d6] hover:border-[#a394d6] flex items-center justify-center ${
                                        //@ts-ignore
                                        selectedSubjects.includes(subject.value)
                                          ? "bg-[#6c5baa] border-none p-0.5"
                                          : ""
                                      }`}
                                    >
                                      {selectedSubjects.includes(
                                        //@ts-ignore
                                        subject.value
                                      ) && <Check className="text-white" />}
                                    </div>
                                  </div>
                                  <span className="ml-2 text-xl text-white ">
                                    {subject.label}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedSubjects.length > 0 && (
                      <div className="flex flex-wrap items-start justify-start px-4 gap-2 mt-5     sm:max-w-[26rem] mx-auto min-h-[5rem]">
                        {selectedSubjects.map((subject) => (
                          <span
                            key={subject}
                            className="bg-[#B4A5D7] text-white px-4 gap-2 flex items-center  text-xl  w-fit py-2 rounded-lg justify-between"
                          >
                            {subject}
                            <X
                              hanging={20}
                              width={20}
                              className="  cursor-pointer"
                              onClick={() => removeSubject(subject)}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:max-w-[28.6rem] w-full mt-28">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Video introduction<span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
                    disabled={!isEditing}
                    placeholder="Paste here the link to your video introduction."
                    value={videoIntroduction}
                    onChange={(e) => {
                      setVideoIntroduction(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full mt-16">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    About you (at least 250 characters)
                    <span className="text-[#FC7777]">*</span>
                  </label>
                  <textarea
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-3xl  text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
                    disabled={!isEditing}
                    placeholder="Tell us something about who you are and what do you like: it will help us find the right matching for you."
                    value={aboutYou}
                    onChange={(e) => {
                      setAboutYou(e.target.value);
                    }}
                  />
                </div>

                <div className="w-full bg-[#B4A5D7] py-2.5 rounded-lg mt-9 px-6 text-xl sm:max-w-[43rem] text-white flex items-center gap-5 ">
                  <Image  loading="lazy"  src={infoiconfill} alt="" className="w-5 h-5" />
                  <p>
                    This section will be visible to parents on the student’s
                    Dashboard
                  </p>
                </div>
                <div className="w-full mt-16">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Your Education (at least 250 characters)
                    <span className="text-[#FC7777]">*</span>
                  </label>
                  <textarea
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-3xl  text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
                    disabled={!isEditing}
                    placeholder="Tell us something about who you are and what do you like: it will help us find the right matching for you."
                    value={yourEducation}
                    onChange={(e) => {
                      setYourEducation(e.target.value);
                    }}
                  />
                </div>

                <div className="w-full bg-[#B4A5D7] py-2.5 rounded-lg mt-9 px-6 text-xl sm:max-w-[43rem] text-white flex items-center gap-5 ">
                  <Image  loading="lazy"  src={infoiconfill} alt="" className="w-5 h-5" />
                  <p>
                    This section will be visible to parents on the student’s
                    Dashboard
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "CONTACTINFORMATION" && (
            <div className=" mt-8 sm:px-4">
              <h1 className="text-4xl font-bold text-[#685AAD]">
                Contact information
              </h1>
              <div className="mt-14 flex flex-wrap justify-between gap-8">
                <div className="sm:max-w-[30.9rem] w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Phone number <span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                    value={phone}
                    disabled
                  />
                </div>
                <div className="sm:max-w-[30.9rem] w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Email adress <span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                    value={email}
                    disabled
                  />
                </div>
                <div className="sm:max-w-[30.9rem] w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Street name <span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                    value={streetName}
                    onChange={(e) => {
                      setStreetName(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>
                <div className="sm:max-w-[30.9rem] w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Shipping address <span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                    value={shippingAddress}
                    onChange={(e) => {
                      setShippingAddress(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>
                <div className="sm:max-w-[30.9rem] w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    City <span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>
                <div className="sm:max-w-[30.9rem] w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Post code <span className="text-[#FC7777]">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                    value={postcode}
                    onChange={(e) => {
                      setPostcode(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>

                <div className="w-full sm:max-w-[30.9rem] mt-4">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                    Country <span className="text-[#FC7777]">*</span>
                  </label>
                  <div className="relative  select-none mt-2">
                    <div
                      className={`w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-4 rounded-lg cursor-pointer flex justify-between items-center`}
                      onClick={toggleCountryDropdown}
                    >
                      <span>{selectedCountry || "select Country"}</span>

                      {isCountryOpen ? (
                        <ChevronUp size={22} className="text-white" />
                      ) : (
                        <ChevronDown size={22} className="text-white" />
                      )}
                    </div>
                    {isCountryOpen && (
                      <div className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3 ">
                        <div
                          id="style-2"
                          className="max-h-[16.4rem] overflow-y-scroll  "
                        >
                          {countryoptions.map((country) => (
                            <div
                              key={country.value}
                              className="py-2 cursor-pointer flex items-center"
                              onClick={() => handleCountryClick(country.value)}
                            >
                              <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                                <span className="ml-2 text-xl text-white ">
                                  {country.label}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full sm:max-w-[30.9rem] mt-4">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                    Timezone <span className="text-[#FC7777]">*</span>
                  </label>
                  <div className="relative  select-none mt-2">
                    <div
                      className={`w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-4 rounded-lg cursor-pointer flex justify-between items-center`}
                      onClick={toggleTimezoneDropdown}
                    >
                      <span>{selectedTimezone || "select Country"}</span>

                      {isTimezoneOpen ? (
                        <ChevronUp size={22} className="text-white" />
                      ) : (
                        <ChevronDown size={22} className="text-white" />
                      )}
                    </div>
                    {isTimezoneOpen && (
                      <div className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  ">
                        <div
                         id="style-2"
                  className="max-h-[16.4rem] overflow-y-scroll  "
                        >

                        {timezoneoptions.map((time) => (
                          <div
                            key={time.value}
                            className=" py-2 cursor-pointer flex items-center"
                            onClick={() => handletimezoneClick(time.value)}
                          >
                          

                            <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                        <span className="ml-2 text-xl text-white ">
                        {time.label}
                        </span>
                      </div>
                          </div>
                        ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "PROFESSIONALEXPERIENCE" && (
            <div className=" mt-8 sm:px-4">
              <h1 className="text-4xl font-bold text-[#685AAD]">
                Professional experience
              </h1>
              <div className="mt-11  ">
                <div className="flex flex-wrap justify-between gap-8">
                  <div className="sm:max-w-[29rem] w-full">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                      Current job <span className="text-[#FC7777]">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                      value={currentJob}
                      onChange={(e) => {
                        setCurrentJob(e.target.value);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="sm:max-w-[29rem] w-full">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                      Tutoring experience years{" "}
                      <span className="text-[#FC7777]">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                      value={tutoringExperience}
                      onChange={(e) => {
                        setTutoringExperience(e.target.value);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <div className="w-full mt-9">
                    <textarea
                      className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-3xl  text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
                      value={moreAboutProfessionalExperience}
                      onChange={(e) => {
                        setMoreAboutProfessionalExperience(e.target.value);
                      }}
                      disabled={!isEditing}
                      placeholder="Tell us more about your professional experience."
                    />
                  </div>
                </div>

                <div className="flex justify-between flex-wrap gap-4">
                  {/* select tutoring level */}

                  <div className="w-full sm:max-w-[29.7rem] mt-32 pt-1">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                      Subject levels you want to teach
                    </label>

                    <div className="relative  select-none mt-3 ">
                      <div
                        className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2 rounded-lg cursor-pointer flex justify-between items-center"
                        onClick={toggleSubjectLEVELDropdown}
                      >
                        <span className="my-1">
                          {selectedSubjectsLEVEL.length > 0
                            ? `${selectedSubjectsLEVEL.length} selected`
                            : "select subject(s)"}
                        </span>
                        {isSubjectLEVELDropdownOpen ? (
                          <ChevronUp size={22} className="text-white " />
                        ) : (
                          <ChevronDown size={22} className="text-white " />
                        )}
                      </div>

                      {isSubjectLEVELDropdownOpen && (
                        <div
                          onMouseLeave={() => {
                            setIsSubjectLEVELDropdownOpen(false);
                          }}
                          className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                        >
                          <div
                            id="style-2"
                            className="max-h-[16.4rem] overflow-y-scroll  "
                          >
                            {subjectLevelOptions.map((subjectlevel) => (
                              <div
                                key={subjectlevel.value}
                                className=" py-2 cursor-pointer flex items-center"
                                onClick={() =>
                                  handleSubjectLEVELClick(subjectlevel.value)
                                }
                              >
                                <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[15rem] truncate">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      // @ts-ignore
                                      checked={selectedSubjectsLEVEL.includes(
                                        //@ts-ignore
                                        subjectlevel.value
                                      )}
                                      onChange={() => {}}
                                      className="absolute opacity-0 cursor-pointer"
                                    />
                                    <div
                                      className={`h-5 w-5 rounded-sm border border-white hover:bg-[#a394d6] hover:border-[#a394d6] flex items-center justify-center ${
                                        // @ts-ignore
                                        selectedSubjectsLEVEL.includes(subjectlevel.value)
                                          ? "bg-[#6c5baa] border-none p-0.5"
                                          : ""
                                      }`}
                                    >
                                      {selectedSubjectsLEVEL.includes(
                                        //@ts-ignore
                                        subjectlevel.value
                                      ) && <Check className="text-white" />}
                                    </div>
                                  </div>
                                  <span className="ml-2 text-xl text-white ">
                                    {subjectlevel.label}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedSubjectsLEVEL.length > 0 && (
                      <div className="flex flex-wrap items-start justify-start  gap-2 mt-5      mx-auto min-h-[5rem]">
                        {selectedSubjectsLEVEL.map((subjectlevel) => (
                          <span
                            key={subjectlevel}
                            className="bg-[#B4A5D7] text-white px-4 gap-2 flex items-center  text-xl  w-fit py-2 rounded-lg justify-between"
                          >
                            {subjectlevel}
                            <X
                              hanging={20}
                              width={20}
                              className="  cursor-pointer"
                              onClick={() => removeSubjectLEVEL(subjectlevel)}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Experience with special needs */}
                  <div className="w-full sm:max-w-[29.7rem] mt-32 pt-1">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                      Experience with special needs students (Optional)
                    </label>

                    <div className="relative  select-none mt-3 ">
                      <div
                        className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2 rounded-lg cursor-pointer flex justify-between items-center"
                        onClick={toggleExperienceWithSpecialNeeds}
                      >
                        <span className="my-1">
                          {selectedExperience.length > 0
                            ? `${selectedExperience.length} selected`
                            : "select"}
                        </span>
                        {isExperienceOpen ? (
                          <ChevronUp size={22} className="text-white " />
                        ) : (
                          <ChevronDown size={22} className="text-white " />
                        )}
                      </div>

                      {isExperienceOpen && (
                        <div
                          onMouseLeave={() => {
                            setIsCountryOpen(false);
                          }}
                          className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                        >
                          <div
                            id="style-2"
                            className="max-h-[16.4rem] overflow-y-scroll  "
                          >
                            {experienceoptions.map((experience) => (
                              <div
                                key={experience.value}
                                className=" py-2 cursor-pointer flex items-center"
                                onClick={() =>
                                  handleExperienceClick(experience.value)
                                }
                              >
                                <div className=" border-b border-white  py-2 flex  gap-4  w-full px-4 sm:max-w-[15rem] truncate">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      // @ts-ignore
                                      checked={selectedExperience.includes(experience.value)}
                                      onChange={() => {}}
                                      className="absolute opacity-0 cursor-pointer"
                                    />
                                    <div
                                      className={`h-5 w-5 rounded-sm border border-white hover:bg-[#a394d6] hover:border-[#a394d6] flex items-center justify-center ${
                                        // @ts-ignore
                                        selectedExperience.includes(experience.value)
                                          ? "bg-[#6c5baa] border-none p-0.5"
                                          : ""
                                      }`}
                                    >
                                      {selectedExperience.includes(
                                        //@ts-ignore
                                        experience.value
                                      ) && <Check className="text-white" />}
                                    </div>
                                  </div>
                                  <span className="ml-2 text-xl text-white ">
                                    {experience.label}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedExperience.length > 0 && (
                      <div className="flex flex-wrap items-start justify-start  gap-2 mt-5      mx-auto min-h-[5rem]">
                        {selectedExperience.map((experience) => (
                          <span
                            key={experience}
                            className="bg-[#B4A5D7] text-white px-4 gap-2 flex items-center  text-xl  w-fit py-2 rounded-lg justify-between"
                          >
                            {experience}
                            <X
                              hanging={20}
                              width={20}
                              className="  cursor-pointer"
                              onClick={() => removeExperience(experience)}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ACADEMICBACKGROUND" && (
            <div className=" mt-8 ">
              <h1 className="text-4xl font-bold text-[#685AAD]">
                Academic background
              </h1>

              <div className="mt-14 flex flex-wrap justify-between gap-8 sm:max-w-[61rem]  ">
                <div className="sm:max-w-[29rem] w-full flex flex-col gap-10">
                  <div className="w-full">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                      Graduation school{" "}
                      <span className="text-[#FC7777]">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                      value={graduationSchool}
                      onChange={(e) => {
                        setGraduationSchool(e.target.value);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                      Highest degree <span className="text-[#FC7777]">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                      value={highestDegree}
                      onChange={(e) => {
                        setHighestDegree(e.target.value);
                      }}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="sm:max-w-[28rem] custom-2xl:sm:max-w-[22rem] w-full  flex flex-col gap-10 ">
                  <div className="w-full">
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                      Country <span className="text-[#FC7777]">*</span>
                    </label>
                    <div className="relative  select-none mt-4">
                      <div
                        className={`w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2.5 rounded-lg cursor-pointer flex justify-between items-center`}
                        onClick={toggleAcedmicCountrydown}
                      >
                        <span>
                          {selectedAcademicCountry || "select Country"}
                        </span>

                        {isAcademicCountryopen ? (
                          <ChevronUp size={22} className="text-white" />
                        ) : (
                          <ChevronDown size={22} className="text-white" />
                        )}
                      </div>
                      {isAcademicCountryopen && (
                        <div className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  ">
                          <div
                          id="style-2"
                  className="max-h-[16.4rem] overflow-y-scroll  "
                          >

                          {countryoptions.map((country) => (
                            <div
                              key={country.value}
                              className="py-1 cursor-pointer flex items-center w-[70%]"
                              onClick={() =>
                                handleAcademicCountryClick(country.value)
                              }
                            >
                              
                              <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                        <span className="ml-2 text-xl text-white ">
                        {country.label}
                        </span>
                      </div>
                            </div>
                          ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setIsPopupOpen(true);
                    }}
                  >
                    <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                      Qualifications
                    </label>
                    <div className="flex items-center hover:cursor-pointer h-fit gap-4 mt-5">
                      <Image  loading="lazy"  src={addicon} alt="" className="" />
                      <span className="font-medium text-[#B4A5D7] text-lg ">
                        Add Qualification
                      </span>
                    </div>
                  </div>

                  {isPopupOpen && (
                    <div className="fixed inset-0 bg-[#F8F5FF] flex justify-center items-start py-[75px] z-50 min-h-screen overflow-auto ">
                      <div className="bg-[#EDE8FA] w-full sm:max-w-[1605px] min-h-[932px] h-fit rounded-3xl px-6 sm:px-12 custom-xl:px-[116px] py-6 sm:py-12 custom-xl:py-[88px] space-y-6 relative">
                        <h1 className="text-[#6B5BA9] text-4xl font-bold mb-8">
                          Upload Your Qualification and Verification Documents
                        </h1>

                        <p className="text-[#6B5BA9] text-2xl leading-tight ">
                          Providing your qualification and verification
                          documents is crucial for expanding your tutoring
                          capabilities. By uploading these files, you <br />{" "}
                          enable us to validate your expertise and allow you to
                          tutor in more than two subjects. Additionally,
                          completing this process can help <br /> you level up
                          your account instantly. Please note that the leveling
                          up will be applied after our team reviews your account
                          and documents. <br /> This verification is a step
                          towards unlocking greater opportunities and
                          recognition within our platform.
                        </p>

                        <div className="grid grid-cols-1 custom-xl:grid-cols-2 gap-0 pt-3 sm:max-w-[79rem]">
                          {/* SubjectToVerify select */}
                          <div className="w-full sm:max-w-[29.7rem] sm:mt-11">
                            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] pb-1">
                              Select the subject you wish to provide
                              verification for
                            </label>
                            <div className="relative  select-none mt-1 sm:mt-5 ">
                              <div
                                className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-3.5 rounded-lg cursor-pointer flex justify-between items-center"
                                onClick={toggleSubjectToVerifyDropdown}
                              >
                                <span className="my-1">
                                  {selectedSubjectToVerifys.length > 0
                                    ? `${selectedSubjectToVerifys}`
                                    : "select Subject"}
                                </span>
                                {isSubjectToVerifyDropdownOpen ? (
                                  <ChevronUp
                                    size={22}
                                    className="text-white "
                                  />
                                ) : (
                                  <ChevronDown
                                    size={22}
                                    className="text-white "
                                  />
                                )}
                              </div>

                              {isSubjectToVerifyDropdownOpen && (
                                <div
                                  onMouseLeave={() => {
                                    setIsSubjectToVerifyDropdownOpen(false);
                                  }}
                                  className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                                >
                                  <div
                                    id="style-2"
                                    className="max-h-[16.4rem] overflow-y-scroll  "
                                  >
                                    {subjectOptions.map((SubjectToVerify) => (
                                      <div
                                        key={SubjectToVerify.value}
                                        className=" py-2 cursor-pointer flex items-center"
                                        onClick={() =>
                                          handleSubjectToVerifyClick(
                                            SubjectToVerify.value
                                          )
                                        }
                                      >
                                        <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                                          <span className="ml-2 text-xl text-white ">
                                            {SubjectToVerify.label}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* purpose of attechment */}
                          <div className="w-full sm:max-w-[29.7rem] mt-3 sm:mt-11">
                            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] pb-1">
                              Select the Purpose of Your Attachment
                            </label>
                            <div className="relative  select-none mt-1 sm:mt-5 ">
                              <div
                                className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-3.5 rounded-lg cursor-pointer flex justify-between items-center"
                                onClick={togglePurposeOfAttechmentDropdown}
                              >
                                <span className="my-1">
                                  {selectedPurposeOfAttechments.length > 0
                                    ? `${selectedPurposeOfAttechments}`
                                    : "select"}
                                </span>
                                {isPurposeOfAttechmentDropdownOpen ? (
                                  <ChevronUp
                                    size={22}
                                    className="text-white "
                                  />
                                ) : (
                                  <ChevronDown
                                    size={22}
                                    className="text-white "
                                  />
                                )}
                              </div>

                              {isPurposeOfAttechmentDropdownOpen && (
                                <div
                                  onMouseLeave={() => {
                                    setIsPurposeOfAttechmentDropdownOpen(false);
                                  }}
                                  className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                                >
                                  <div
                                    id="style-2"
                                    className="max-h-[16.4rem] overflow-y-scroll  "
                                  >
                                    {PurposeOfAttachment.map(
                                      (PurposeOfAttechment) => (
                                        <div
                                          key={PurposeOfAttechment.value}
                                          className=" py-2 cursor-pointer flex items-center"
                                          onClick={() =>
                                            handlePurposeOfAttechmentClick(
                                              PurposeOfAttechment.value
                                            )
                                          }
                                        >
                                          <div className=" border-b border-white  py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                                            <span className="ml-2 text-xl text-white ">
                                              {PurposeOfAttechment.label}
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 pt-3 sm:pt-16">
                          <label className="block text-lg sm:text-lg font-semibold text-[#685AAD] mt-0.5 mb-6">
                            Please name your file as
                            [LastName_FirstName_Subject_DocumentType]
                          </label>
                          <div className="border bg-[#B4A5D7] w-full sm:max-w-[29.7rem] rounded-lg flex items-start  p-3.5 gap-4 flex-col">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="relative group bg-white text-black w-full sm:max-w-[29.7rem] rounded-lg flex items-center justify-between px-10 py-3.5 mt-2"
                              >
                                <span
                                  onClick={() => removeFile(index)}
                                  className="absolute -top-2 -right-2 hidden group-hover:block hover:cursor-pointer"
                                >
                                  <XCircle
                                    fill="white"
                                    className="text-red-500 "
                                  />
                                </span>
                                <span className=" font-medium flex gap-4 items-center">
                                  <Image  loading="lazy"  src={bluefoldericon} alt="" />{" "}
                                  {
                                    //@ts-ignore
                                    file.name
                                  }
                                </span>

                                <Image  loading="lazy"  src={downloadicon} alt="" />
                              </div>
                            ))}

                            <div className="flex items-center gap-4 px-4">
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex items-center gap-4"
                              >
                                <Image  loading="lazy"  src={addicon2} alt="" className="w-12" />
                                <span className="text-white font-medium">
                                  Attach Your File Here
                                </span>
                              </label>
                              <input
                                id="file-upload"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>
                        </div>  


                        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

                        <div className=" custom-2xl:absolute bottom-8 custom-xl:bottom-10 right-9 space-x-2 sm:space-x-6  space-y-2 ">
                          <button
                            onClick={() => {
                              setIsPopupOpen(false);
                            }}
                            className=" bg-[#FF7B7B] text-white px-10 sm:px-24 py-2.5 text-xs sm:text-xl rounded-md hover:bg-[#FF6B6B] transition-colors"
                          >
                            Cancel
                          </button>
                          {files.length > 0 && (
                            <button
                            onClick={(e)=>{
                              handleSubmit(e)
                            }}
                            className=" bg-[#9052FC] text-white  px-10 sm:px-24 py-2.5 text-xs sm:text-xl  rounded-md hover:bg-[#FF6B6B] transition-colors">
                               {isSubmitting ? 'Uploading...' : 'Submit Document for Verification'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="w-full mt-20">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    International experience (optional)
                  </label>
                  <textarea
                    className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-xl  text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
                    disabled={!isEditing}
                    placeholder="Tell us something about who you are and what do you like: it will help us find the right matching for you."
                    value={internationalExperience}
                    onChange={(e) => {
                      setInternationalExperience(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="sm:max-w-[29rem] w-full mt-16">
                <div className="w-full space-y-4">
                  <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                    Languages you can tutor in{" "}
                    <span className="text-[#FC7777]">*</span>
                  </label>

                  <div className="space-y-2">
                    {/* Existing languages */}
                    {languages.map((language, index) => (
                      <div key={index} className="relative">
                        <input
                          type="text"
                          value={language}
                          className="px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl"
                          disabled={!isEditing}
                        />
                        {isEditing && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 -right-10 cursor-pointer"
                            onClick={() => handleDeleteLanguage(index)}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="#B4A5D7"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* New language input */}
                    {showNewInput && (
                      <div className="relative">
                        <input
                          type="text"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          placeholder="enter language name"
                          className="px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl placeholder:text-white"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              if (newLanguage != "") {
                                handleSubmitLanguage();
                              }
                            }
                          }}
                          autoFocus
                        />
                        {/* Cross button outside input box */}
                        {isEditing && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 -right-10 cursor-pointer"
                            onClick={handleSubmitLanguage}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="#B4A5D7"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Add button - always visible when isEditing is true */}
                  {isEditing && (
                    <div className="mt-6">
                      <Image  loading="lazy" 
                        onClick={() => {
                          handleSubmitLanguage();
                          handleAddLanguage();
                        }}
                        src={addicon}
                        alt=""
                        className="mt-6 w-14 h-14 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="w-full flex items-center justify-center mt-20">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-[#9052FC]  font-medium text-white text-2xl px-32 rounded-lg hover:bg-[#6b33cc] transition-all duration-300 py-2"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={toggleEdit}
                className="bg-[#FC7777]  font-medium text-white text-2xl px-32 rounded-lg hover:bg-[#6b33cc] transition-all duration-300 py-2"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        #style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #c9bbef;
        }

        #style-2::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }

        #style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;

          background-color: white;
        }
      `}</style>
    </div>
  );
}

export default Profile;

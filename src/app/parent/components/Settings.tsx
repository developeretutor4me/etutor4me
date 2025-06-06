import React, { useEffect, useState } from "react";
import Image from "next/image";
import plusicon from "../../../../public/plus circle icon purple.svg";
import editicon from "../../../../public/edit icon.svg";
import alert from "../../../../public/alert.svg";
// import { PhoneInput } from "./phone-input";
import { useSession } from "next-auth/react";
import { ChevronDown, Edit2 } from "lucide-react";
import Germany from "../../../../public/Flag_of_Germany.svg.webp";
import UnitedKingdom from "../../../../public/Flag_of_the_United_Kingdom_(1-2).svg.webp";
import UnitedStates from "../../../../public/america.png";
import France from "../../../../public/Flag-France.webp";
import Italy from "../../../../public/images.png";
import Ireland from "../../../../public/Irish_Flag__86476.jpg";
import Canada from "../../../../public/Flag-Canada.webp";
import Malta from "../../../../public/Flag-Malta.webp";
import Belize from "../../../../public/Belize.jpg";
import Belgium from "../../../../public/Belgium.webp";
import Switzerland from "../../../../public/Switzerland.png";
import Luxembourg from "../../../../public/Luxembourg.jpeg";
import Monaco from "../../../../public/Monaco.png";
import Haiti from "../../../../public/Haiti.png";
import Austria from "../../../../public/Flag_of_Austria.png";
import Liechtenstein from "../../../../public/liechtenstein.webp";
import Jamaica from "../../../../public/Flag_of_Jamaica.png";
import Barbados from "../../../../public/Flag_of_Barbados.svg";
import SaintLucia from "../../../../public/Saint Lucia.png";
import BurkinaFaso from "../../../../public/Flag-of-Burkina-Faso.webp";
import IvoryCoas from "../../../../public/ivory-coast.webp";
import useSWR from 'swr';
import Link from "next/link";
import { useToast } from "@/hooks/use-toast"
import axios from "axios";
import { useRouter } from "next/navigation";




interface CountryCode {
  code: string;
  flag: string;
  name: string;
}
const countryCodes: CountryCode[] = [
  { code: "+49", flag: Germany, name: "Germany" },
  { code: "+44", flag: UnitedKingdom, name: "United Kingdom" },
  { code: "+1", flag: UnitedStates, name: "United States" },
  { code: "+33", flag: France, name: "France" },
  { code: "+39", flag: Italy, name: "Italy" },
  { code: "+353", flag: Ireland, name: "Ireland" },
  { code: "+1", flag: Canada, name: "Canada" },
  { code: "+356", flag: Malta, name: "Malta" },
  { code: "+501", flag: Belize, name: "Belize" },
  { code: "+32", flag: Belgium, name: "Belgium" },
  { code: "+41", flag: Switzerland, name: "Switzerland" },
  { code: "+352", flag: Luxembourg, name: "Luxembourg" },
  { code: "+377", flag: Monaco, name: "Monaco" },
  { code: "+509", flag: Haiti, name: "Haiti" },
  { code: "+43", flag: Austria, name: "Austria" },
  { code: "+423", flag: Liechtenstein, name: "Liechtenstein" },
  { code: "+1 876", flag: Jamaica, name: "Jamaica" },
  { code: "+1 246", flag: Barbados, name: "Barbados" },
  { code: "+1 758", flag: SaintLucia, name: "Saint Lucia" },
  { code: "+226", flag: BurkinaFaso, name: "Burkina Faso" },
  { code: "+225", flag: IvoryCoas, name: "Ivory Coast" },
];

interface userprofileprops{
  Uploadedprofilepicture:any
}
const UserProfile= ({Uploadedprofilepicture}:userprofileprops) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"personal" | "account">("personal");
  const [subactive, setsubactive] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstNames, setFirstName] = useState("Loading...");
  const [Lastname, setLastname] = useState("Loading...");
  const [Age, setAge] = useState("Loading...");
  const [grade, setGrade] = useState("Loading...");
  const [studentid, Setstudentid] = useState("Loading...");
  const [Institution, setInstitution] = useState("Loading...");
  const [additionalinfo, setAdditionalinfo] = useState("Loading...");
  const [parentData, setParentData] = useState<any>(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [userId, setUserId] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState("/assets/heroimg.png");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [completephonenumber, setCompletephonenumber] = useState("")
  const [fetchedPhonenumber, setfetchedPhonenumber] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const [ishovered, setIshovered] = useState(null)
  // student impersonation code:
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const { data: session, status ,update} = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pictureuploadloading, setpictureuploadloading] = useState(false)  




 
  useEffect(() => {
    const fetchStudents = async () => {
        if (!session?.user?.id) return;
  
        try {
          const userId = session.user.id; 
          const response = await axios.get('/api/parent-Student-Relationship/parent-side-api/fetchAcceptedRequests', {
            params: { parentUserId: userId  }, // Send userId to the backend
          });
          setAcceptedRequests(response.data.requests);
         
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoading(false);
        }
      };
    fetchStudents();
  }, [session]);

  const handleImpersonate = async (studentUserId: string, StudentEmail:string) => {
   
    await update({
      user:{
        email:StudentEmail,
        role:"student",
        id:studentUserId,
        isParent:true,
        isAdmin:false
      }
    })
    setTimeout(() => {
        router.push('/studentdashboard')
    }, 3000);
  };










  const handleEdit = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  async function updatePhoneNumber() {
    try {
      const response = await fetch('/api/update-phone-number', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: completephonenumber }),
      });
  
      const result = await response.json();
      if (response.ok) {
      } else {
        console.error(result.message); // Error message
      }
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  }
  const handleSave = async () => {
    setfetchedPhonenumber(`(${selectedCountry.code}) ${phoneNumber}`)
    await setCompletephonenumber(`(${selectedCountry.code}) ${phoneNumber}`)
    setIsEditing(false);
    setShowDropdown(false);
    updatePhoneNumber()
  };


  

  const handleCancel = () => {
    setIsEditing(false);
    setShowDropdown(false);
  };

  const fetcher = async (url: string, userId: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
  
    if (!response.ok) {
      console.error("Failed to fetch parent data");
      throw new Error("Failed to fetch parent data");
    }
  
    const data = await response.json();
    return data.parentData;
  };
  
  // Use SWR hook
  // @ts-ignore
  const { data: parentDataSWR, err:any } = useSWR(
    session?.user.id ? ["/api/parentapis/fetch-parent-data", session.user.id] : null,
    ([url, userId]) => fetcher(url, userId),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: (data) => {
        setParentData(data);
      },
      onError: (err) => {
        console.error("Error fetching parent data:", err);
      }
    }
  );
  
  // Update all the states when parentDataSWR changes
  useEffect(() => {
    try {
      setUserId(session?.user.id);
      if (parentDataSWR) {
        setEmail(parentDataSWR?.user?.email);
        setPhone(parentDataSWR?.phoneNumber);
        setFirstName(parentDataSWR?.firstName);
        setLastname(parentDataSWR?.lastName);
        setAge(parentDataSWR?.age);
        setGrade(parentDataSWR?.grade);
        Setstudentid(parentDataSWR?._id?.substring(0, 6));
        setfetchedPhonenumber(parentDataSWR?.phoneNumber);
        setInstitution(parentDataSWR?.Institution);
        setSelectedSubjects(parentDataSWR?.subjectChildNeeds || []);
        setAdditionalinfo(parentDataSWR?.additionalInformation);
      }
    } catch (err) {
      console.error(err);
    }
  }, [session, subactive, parentDataSWR]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();

    const response = await fetch("/api/update-email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail, password }),
    });

    const data = await response.json();
    if (response.ok) {
     

      toast({
        title: "Email updated successfully",
        description: "",
        variant: "default",
      });
      setsubactive("")
      setActiveTab("account")
      setLoading(false)
      setNewEmail("");
      setPassword("");
    } else {
     
      toast({
        title: "",
        description: `${data.message}`,
        variant: "destructive",
      });
      setLoading(false)
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setPhoneNumber(""); // Reset or keep existing value when canceling
  };
  const handleSaveClick = () => setIsEditing(false);

  const hanldeupdatepassword = async (e:any) => {
    e.preventDefault();
    setLoading(true)
    setError("");
    setSuccess("");

    // Check if the new password meets the minimum length requirement
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false)
      return;
    }

    // Check if the new password and confirmation password match
    if (newPassword !== confirmNewPassword) {
      setError("New passwords don't match");
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false)
      return;
    }

    try {
      setLoading(true)
      const response = await fetch("/api/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message); // Password updated successfully
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setLoading(false)
      } else {
        setError(data.message); // Error message from the backend
        setLoading(false)
      }
    } catch (error) {
      setError("An error occurred while updating the password");
      console.error(error);
    } finally {
      setLoading(false)
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };


const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };







  const [image, setImage] = useState<File | null>(null); // State to hold the selected image
  const [isUploading, setIsUploading] = useState(false); // State to show the uploading status
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(""); 

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
            userId: userId,
            imageBase64: imageBase64.split(',')[1], // Send only base64 data (not the prefix)
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setImage(null)
          // Successfully uploaded the image, update the profile picture URL
          setUploadedImage(data.profilePictureUrl);
          Uploadedprofilepicture(data.profilePictureUrl)
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
    <div className="min-h-screen rounded-3xl relative  bg-[#EDE8FA] text-white mt-16">
      <div className="px-5 custom-2xl:px-10 py-5 custom-2xl:py-10 flex gap-2 sm:gap-8 custom-2xl:gap-16 ">
        {/* left side bar */}

        <div className="bg-[#A296CC] font-roboto max-w-[20rem] custom-2xl:max-w-[26.4rem] w-full  rounded-3xl  min-h-screen  px-5 custom-2xl:px-10 ">
          
          <div className="m-auto w-full  flex flex-col items-center  mt-20">
            <div className="rounded-full w-[5rem] h-[5rem] custom-2xl:w-[11.4rem] custom-2xl:h-[11.4rem]   overflow-hidden flex items-center justify-center">

            <img
              src={  uploadedImage ||  parentData?.user?.profilePicture}
              alt="Profile"
               loading="eager"
             
              className="h-full w-full object-cover"
            />
            </div>

            <p className="!hover:cursor-pointer relative text-sm sm:text-lg custom-2xl:text-xl font-roboto text-[#534988] font-bold mt-2 ">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange} 
                className="absolute inset-0 w-full h-full opacity-0  !hover:cursor-pointer"
              />
              <span className="hover:cursor-pointer">

              Upload photo
              </span>
             


            </p>
              {image && (
                <button
                className="w-full sm:w-auto py-1 px-9 mt-6 text-base custom-2xl:text-base rounded-sm bg-[#8358F7] hover:bg-[#4a3683] capitalize hover:bg-opacity-90 transition-colors"
                onClick={()=>{
                  handleUpload()
                }}
                >
                  {pictureuploadloading ? "wait...":"upload"} 
                  
                  </button>
              )}
            
              
          </div>

          <div className="space-y-2 mt-[137px] ">
            <button
              className={`w-full py-4  px-9 rounded-3xl text-sm custom-xl:text-lg custom-2xl:text-2xl font-bold transition-all flex  ${
                activeTab === "personal"
                  ? "bg-white text-[#685AAD]"
                  : " text-[#685AAD]"
              }`}
              onClick={() => {
                setActiveTab("personal");
                setsubactive("");
              }}
            >
              Personal information
            </button>
            
            <button
              className={`w-full py-4  px-9 rounded-3xl text-sm custom-xl:text-lg custom-2xl:text-2xl font-bold transition-all flex ${
                activeTab === "account"
                  ? "bg-white text-[#685AAD]"
                  : "text-[#685AAD]"
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account settings
            </button>


                <div className="">

                {acceptedRequests.length>0 && acceptedRequests.map((request:any) => (
           
            <button
              key={request.requestId}
              className={`w-full py-4  px-9 rounded-3xl text-sm custom-xl:text-lg custom-2xl:text-2xl font-bold transition-all duration-1000 flex text-[#685AAD] truncate `}
              onClick={() => handleImpersonate(request.studentUserId,request.StudentEmail)}
              onMouseEnter={() => setIshovered(request.requestId)}
              onMouseLeave={() => setIshovered(null)}
            >
              {/* {ishovered === request.requestId ? "Visit Profile" :request.studentName } */}
              <span
            className={`transition-opacity duration-300 ${
              ishovered === request.requestId ? "opacity-0" : "opacity-100"
            }`}
          >
            {request.studentName}
          </span>
          <span
            className={`absolute transition-opacity duration-300 ${
              ishovered === request.requestId ? "opacity-100" : "opacity-0"
            }`}
          >
            Visit Profile
          </span>
              
              
             
            </button>
          ))}
                </div>
           


            <Link href="/parent/addStudent">
            <button className="w-full py-4  px-9 rounded-3xl text-sm custom-xl:text-lg custom-2xl:text-2xl font-bold transition-all flex  items-center  gap-1 custom-2xl:gap-3 text-[#685AAD]">
              <Image  loading="lazy"  src={plusicon} alt="" className="w-4 custom-2xl:w-8" />
              add&nbsp;a child
            </button>
            </Link>
          </div>
        </div>

        {/* right side content */}
        <div className="w-full font-roboto ">
          {activeTab === "personal" && (
            <div className="space-y-4 mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-roboto text-[#685AAD] font-bold ml-4 sm:ml-8 md:ml-14">
                Personal information
              </h2>
              <div className="grid grid-cols-1 custom-2xl:grid-cols-2 gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-12 md:pt-20 ">
                <div className="w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                    disabled
                    value={firstNames}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                    disabled
                    value={Lastname}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    Country
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                    disabled
                    value={parentDataSWR?.parentPersonalInformation?.country || "Loading..."}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    State / City
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                    disabled
                    value={parentDataSWR?.parentPersonalInformation?.city || "Loading..."}
                  />
                </div>
                <div className="w-full custom-2xl:col-span-2 ">
                  <label className="block text-lg sm:text-xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    Street Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full custom-2xl:w-[47%] rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                    disabled
                    value={parentDataSWR?.parentPersonalInformation?.streetName || "Loading..."}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "account" && subactive === "" && (
            <div className="space-y-4 mt-10">
              <div className="flex flex-col gap-8">
                <div className=" custom-2xl:max-w-[55%] w-full mb-2.5">
                  <div className="max-w-xl ">
                    <div className="flex justify-between items-center px-12 mb-3.5">
                      <label className="text-lg sm:text-xl font-semibold   text-[#685AAD]  ">
                        Phone Number
                      </label>
                      {!isEditing ? (
                        <Image  loading="lazy" 
                          src={editicon}
                          alt=""
                          className="w-12 cursor-pointer"
                          onClick={handleEdit}
                        />
                      ) : (
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={handleCancel}
                            className="  text-sm text-[#8653FF] px-4 py-1 rounded-full"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className=" text-white text-sm bg-[#8653FF] px-4 py-1 rounded-full"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>

                    {!isEditing ? (
                      <div className="bg-purple-100 rounded-full py-5 px-10  text-[#685AAD] bg-[#DBCAFF]">
                        <p className="text-[#685AAD] bg-[#DBCAFF] text-lg truncate">
                         {fetchedPhonenumber} 
                        </p>
                      </div>
                    ) : (
                      <div className=" text-[#685AAD] bg-[#DBCAFF] rounded-full">
                        <div className="relative">
                          <div className="bg-purple-100 rounded-full py-[18px] px-10 flex items-center ">
                            <button
                              onClick={() => setShowDropdown(!showDropdown)}
                              className="flex items-center  pr-3 min-w-fit"
                            >
                              <div className="flex items-center gap-4  ">
                                <span className="">
                                  <Image  loading="lazy" 
                                    src={selectedCountry.flag}
                                    alt=""
                                    className="w-8 h-8 rounded-full"
                                  />
                                </span>
                                <span className="text-[#685AAD] text-xl">
                                  {selectedCountry.code}
                                </span>
                              </div>
                              
                              <ChevronDown className="ml-5 w-5 h-5 text-[#685aad5e] font-bold" />
                            </button>
                            <input
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="bg-transparent ml-6 w-full outline-none text-[#685AAD] bg-[#DBCAFF] placeholder-[#685aad57] font-medium truncate"
                              placeholder="Phone number"
                            />
                          </div>

                          {showDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-44 bg-[#DBCAFF] rounded-3xl shadow-lg py-2  max-h-[12.5rem] px-3 overflow-y-auto scrollbar-none">
                              {countryCodes.map((country) => (
                                <button
                                  key={country.code}
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setShowDropdown(false);
                                  }}
                                  className="flex items-center space-x-3 w-full p-3 hover:bg-purple-50 transition-colors border-b border-[#0000004b] last:border-b-0  "
                                >
                                  <span className="rounded-full relative  flex items-center justify-center">
                                    <Image  loading="lazy" 
                                      src={country.flag}
                                      alt=""
                                      className="w-6 h-6 rounded-full"
                                    />
                                  </span>
                                  <span className="text-[#685AAD]">
                                    {country.code}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="custom-2xl:max-w-[55%] w-full">
                  <div className="flex justify-between items-center px-12">
                    <label className="text-lg sm:text-xl font-semibold   text-[#685AAD]  ">
                      Email Address
                    </label>
                    <Image  loading="lazy" 
                      src={editicon}
                      alt=""
                      className="w-12 cursor-pointer"
                      onClick={() => setsubactive("email")}
                    />
                  </div>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      className="mt-2 sm:mt-2 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                      value={email}
                    />
                  </div>
                </div>

                <div className="w-[90%] border border-[#685aad89] mt-8"></div>
              </div>

              <div className="grid grid-cols-1 custom-2xl:grid-cols-2 gap-4">
                <div>
                  <label className="text-lg sm:text-xl font-semibold   text-[#685AAD] pl-12">
                    Old password
                  </label>
                  <input
                    type="password"
                    className="mt-4  placeholder-[#685aad5b]  sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                    placeholder="old password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center ">
                  {success && <p className="text-green-500">{success}</p>}
                  {error && (
                    <div className="flex items-center gap-3 text-xs text-[#FF9580]">
                      <Image  loading="lazy"  src={alert} alt="" className="h-7 w-7" />
                      {error && <p className="">{error} </p>}
                      {/* <p>The password you entered is incorrect. Please enter the correct password, or click here to receive an email to reset it </p> */}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-lg sm:text-xl font-semibold   text-[#685AAD]  pl-12">
                    New password
                  </label>
                  <input
                    type="password"
                    className="mt-4 placeholder-[#685aad5b]  sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-lg sm:text-xl font-semibold   text-[#685AAD] pl-12">
                    Repeat new password
                  </label>
                  <input
                    type="password"
                    className="mt-4 placeholder-[#685aad5b]   sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                    placeholder="repeat password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-7 ">
                <button className=" bg-[#685AAD] rounded-full text-sm sm:text-lg custom-2xl:text-2xl font-medium  px-3 sm:px-5 custom-2xl:px-10  py-1 sm:py-2 custom-2xl:py-3">
                  cancel
                </button>
                <button
                  onClick={hanldeupdatepassword}
                  className="bg-[#8653FF]  rounded-full text-sm sm:text-lg custom-2xl:text-2xl font-medium  px-3 sm:px-5 custom-2xl:px-10  py-1 sm:py-2 custom-2xl:py-3"
                >
                  {loading ? "Please wait..." : "save changes"} 
                </button>
              </div>
            </div>
          )}
          {subactive === "email" && (
            <div className="mt-40 flex flex-col gap-12 items-center ">
              <div className=" w-full custom-2xl:w-[90%]">
                <label className="text-lg sm:text-2xl font-semibold   text-[#685AAD] pl-12">
                  New Email Address{" "}
                </label>
                <input
                  type="email"
                  className="mt-4  placeholder-[#685aad5b]  sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                  placeholder="enter new email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <div className="w-full custom-2xl:w-[90%]">
                <label className="text-lg sm:text-2xl font-semibold   text-[#685AAD] pl-12">
                  Current Password{" "}
                </label>
                <input
                  type="password"
                  className="mt-4  placeholder-[#685aad5b]  sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-2xl"
                  placeholder="enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-7 ">
                <button
                  onClick={() => setsubactive("")}
                  className=" bg-[#685AAD] rounded-full text-sm sm:text-lg custom-2xl:text-3xl font-medium  px-3 sm:px-5 custom-2xl:px-10  py-1 sm:py-2 custom-2xl:py-3"
                >
                  cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#8653FF]  rounded-full text-sm sm:text-lg custom-2xl:text-3xl font-medium  px-3 sm:px-5 custom-2xl:px-10  py-1 sm:py-2 custom-2xl:py-3"
                >
                  {loading ? "Please wait..." : "save changes"} 
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

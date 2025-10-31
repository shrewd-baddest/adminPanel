import React, { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import vecteezy from "../assets/vecteezy-milik-splash.jpg"
import {MagnifyingGlassIcon,GlobeAltIcon,AdjustmentsHorizontalIcon,RocketLaunchIcon,MagnifyingGlassPlusIcon,
  SpeakerWaveIcon,MagnifyingGlassMinusIcon,SpeakerXMarkIcon,
  ClockIcon} from "@heroicons/react/24/outline";
import Switch from "./Switch";
import GoogleTranslate from "./GoogleTranslate";
import { useStyles } from "./StylingProvider.jsx";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("general");
  const token = localStorage.getItem("token");
  const [accountData, setAccountData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [number, setNumber] = useState(null);
  const [staffName, setStaffName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [notify,setNotify] = useState([]);
  const [activeNotify, setActiveNotify] = useState('all');
  const [query,setQuery]=useState('');
  const [language,setLanguage]=useState('English');
  const [theme,setTheme]=useState('light');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [fontSize,setFontSize]=useState('full');
  const [isSoundOn,setIsSoundOn]=useState(true);
  const [volume,setVolume]=useState(50);
  const [isAutoUpdateOn, setIsAutoUpdateOn] = useState(true);
  const {themeSetter,fontSetter}=useStyles();
    const options = ["Light", "Dark", "System"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://adminpanel-8j8g.onrender.com/pages/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setNumber(data[0].number);
        setId(data[0].id);
        setEmail(data[0].email);
        setPassword(data[0].password);
        setRole(data[0].role);
        setStaffName(data[0].name);
        setAccountData(data);
      } catch (error) {
        console.error("Error fetching account data:", error.message);
      }
    };
    const handleNotification = async () => {
      await fetch("https://adminpanel-8j8g.onrender.com/pages/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const keep = data.filter((item) => item.is_read === 0);
          setNotify(keep);
          console.log(keep);
        }).catch((err) => console.log(err));
    };
    Promise.all([fetchData() , handleNotification()]);
  }, [token]);

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!staffName || !role || !id || !password || !email) {
      return alert("Please fill all the fields and upload an image.");
    }

    const formData = new FormData();
    formData.append("role", role);
    formData.append("id", id);
    formData.append("password", password);
    formData.append("staffName", staffName);
    formData.append("email", email);
    formData.append("number", number);

    try {
      const response = await axios.post(
        "https://adminpanel-8j8g.onrender.com/authority/regist",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.message == "successful") {
        navigate("/");
        alert("Staff added successfully");
      }
    } catch (error) {
      console.error("Error adding staff:", error.message);
    }
  };
  const renderContent = () => {
    const saveChanges=()=>{
      axios.post("https://adminpanel-8j8g.onrender.com/pages/settings",
        {language,theme,isSwitchOn,fontSize,isSoundOn,volume,isAutoUpdateOn},
        {headers:{Authorization:`Bearer ${token}`}});}
    
    switch (activeTab) {
      case "general": {
        return (
          <>
              <div className="genaralSettings">
            <div className="inline-flex ml-5" >
              <GlobeAltIcon className="w-6 h-6 font-bold text-gray-800" />
               <h2 className="font-semibold ">Language</h2>
                           <GoogleTranslate />

             </div>
      <div title="Language" icon="language">
            {/* <select
              className="w-full transition rounded-lg form-select border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {["English", "Spanish", "French", "German", "Japanese"].map(
                (lang) => (
                  <option key={lang}>{lang}</option>
                )
              )}
            </select> */}
          </div>
        
             <section>
      <h2 className="flex items-center mb-4 font-semibold">
        <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-gray-500" />
        Theme
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {options.map((opt) => (
          <label
            key={opt}
            onClick={() =>{ 
              setTheme(opt);
            themeSetter(opt.toLowerCase());
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              theme === opt
                ? " bg-primary/10 text-primary border-blue-600 shadow-md"
                : "border-gray-300 text-gray-500 hover:shadow-md"
            }`}
          >
            <span className="text-sm font-medium">{opt}</span>
          </label>
        ))}
      </div>
    </section>
    
            <div className="inline-flex mt-5 ml-5" >
              <RocketLaunchIcon className="w-6 h-6 font-bold text-gray-800" />
               <h2 className="font-bold ">Start behaviour</h2>
    </div>
    <div className="mt-8 launch">
    <h3>Launch on system start up </h3>
    <Switch onChange={() => setIsSwitchOn(!isSwitchOn)} checked={isSwitchOn} className='mr-5' />

    </div>

    <div  className="mt-10 scaling">
      <div className="inline-flex">

{
  fontSize==='full'?<MagnifyingGlassMinusIcon className="w-6 h-6 font-bold text-gray-800" />:<MagnifyingGlassPlusIcon className="w-6 h-6 font-bold text-gray-800" />
}
      <h3 className="font-bold">Display scaling</h3>
      </div>

<select className="w-3/4 h-full transition rounded-lg form-select border-border-light dark:border-border-dark dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary"
              value={fontSize}
              onChange={(e) =>{ 
                fontSetter(e.target.value);
                setFontSize(e.target.value)}}>
  <option value="16">200%</option>
   <option value="24">300%</option>
  <option value="20">250%</option>
  <option value="12">150%</option>
  <option value="8">100%</option>
  <option value="4">50%</option>
  <option value="2">20%</option>
</select>
    </div>
      <div className="inline-flex mt-5 ml-5" >
{
  isSoundOn?<SpeakerWaveIcon className="w-6 h-6 font-bold text-gray-800" />:<SpeakerXMarkIcon className="w-6 h-6 font-bold text-gray-800" />
}
      <h3 className="font-bold">Sound Preference</h3>
      </div>
    <div className="soundSettings">
      <div className="mt-8 launch">
      <h3 className="font-semibold">Enable Sound Effects</h3>
      <Switch onChange={() => setIsSoundOn(!isSoundOn)} checked={isSoundOn} className='mr-5' />
     </div>
    <div className="inline-flex w-full gap-12 mt-5 ml-5">
      <SpeakerXMarkIcon className="w-6 h-6 font-bold text-gray-800" />
      <input type="range" className="w-9/12" value={volume} onChange={(e) => setVolume(e.target.value)}/>
      <SpeakerWaveIcon className="w-6 h-6 font-bold text-gray-800" />
    </div>
      </div>
    <div className="inline-flex mt-10" > 
      <ClockIcon className="w-6 h-6"/>
      <h3 className="font-bold">Auto Updates</h3>
    </div>
    <div className="inline-flex mt-5 ml-5 launch">
      <h2 className="font-semibold">Enable AutoUpdates</h2>
      <Switch onChange={() => setIsAutoUpdateOn(!isAutoUpdateOn)} checked={isAutoUpdateOn} className='mr-5' />
    </div>
    <div className="mt-10 settingBtns">
      <button className="mb-5 font-bold text-red-900">Reset to Default</button>
      <button className="font-bold changes" onClick={()=>saveChanges()}>Save Changes</button>
      </div>  
    
            
              </div>
          </> 
        );
      }
      case "account": {
        return (
          <>
            <h2 className="font-semibold ">Profile</h2>

            <div className="grid grid-cols-1 gap-4 account-details md:grid-cols-2">
              <div>
                <img
                  src={accountData.image}
                  alt="profile picture"
                  className="object-cover w-24 h-24 rounded-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 settingForm md:grid-cols-4">
                <label>Identification:</label>{" "}
                <input
                  type="number"
                  value={id}
                  readOnly
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
                <label>Name:</label>
                <input
                  type="text"
                  value={staffName}
                  readOnly={!edit}
                  onChange={(e) => setStaffName(e.target.value)}
                />
                <label>Email:</label>
                <input
                  type="text"
                  value={email}
                  readOnly={!edit}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label>Password:</label>
                <input
                  type="text"
                  value={password}
                  readOnly={!edit}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label>Telephone number:</label>{" "}
                <input
                  type="tel"
                  value={number}
                  readOnly={!edit}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                />
                <label>Role:</label>{" "}
                <input
                  type="text"
                  value={role}
                  readOnly={!edit}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4 ml-12 right-2 editButtons">
              <input
                type="button"
                value="edit"
                onClick={() => setEdit((prevEdit) => !prevEdit)}
                className="px-4 py-0 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
              />
              <input
                type="button"
                value="save changes"
                onClick={() => handleSubmission()}
                className="px-4 py-0 bg-red-500 border border-red-300 rounded-md cursor-pointer hover:bg-red-300"
              />
            </div>
          </>
        );
      }

case "notification": {

  const handleSubmit=()=>{
    axios.post("https://adminpanel-8j8g.onrender.com/pages/notifications",{query},{headers:{Authorization:`Bearer ${token}`}})
  }
  return (
    <>
      <div className="flex flex-col w-full h-auto min-h-screen bg-background-light dark:bg-background-dark font-display text-stone-900 dark:text-stone-200">
        <div className="flex flex-col h-full layout-container grow">
    - 
          {/* Main Content */}
          <main className="flex-1 px-10 py-8 lg:px-20 xl:px-40">
            <div className="max-w-5xl mx-auto">
              <div className="relative w-full h-56 mb-8 overflow-hidden bg-center bg-cover rounded-xl hero-img">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <img src={vecteezy} alt="Milk Splash" className="object-cover w-full h-full" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl font-bold text-stone-900 ">
                    Milk Notifications
                  </h1>
                  <p className="text-stone-600 ">
                    Stay updated on your favorite milk products with real-time alerts.
                  </p>
                </div>
              </div>

              <div className="mb-6 border-b dark:border-stone-800">
                <div className="flex gap-8 text-sm font-bold">
                  <p className={`pb-3 border-b-2  text-stone-900  ${activeNotify === 'all' ? "underline" : "" } hover:text-stone-700`} onClick={() => {setActiveNotify('all')}}>All</p>
                  <p className={`pb-3 border-b-2  text-stone-900  ${activeNotify === 'promotions' ? "underline" : "" } hover:text-stone-700`} onClick={() => {setActiveNotify('promotions');
                    setQuery('promotions');handleSubmit()
                  }}>Promotions</p>
                  <p className={`pb-3 border-b-2  text-stone-900  ${activeNotify === 'expiry' ? "underline" : "" } hover:text-stone-700`} onClick={() => {setActiveNotify('expiry');
                     setQuery('expiry');handleSubmit()
                  }}>Expiry</p>
                  <p className={`pb-3 border-b-2  text-stone-900  ${activeNotify === 'restocks' ? "underline" : "" } hover:text-stone-700`} onClick={() => setActiveNotify('restocks')}>Restocks</p>
                </div>
              </div>

              <div className="mb-8">
                <label className="relative"> 
                  
                <div className="relative w-full">
  <MagnifyingGlassIcon className="absolute w-5 h-5 transform -translate-y-1/2 left-4 top-1/2 text-stone-500" />
  <input
    type="text"
    className="w-full py-3 pl-12 pr-4 text-base border rounded-lg border-stone-300 dark:border-stone-700 bg-background-light dark:bg-background-dark placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-primary"
    placeholder="Search notifications..."  onChange={(e)=>{setQuery(e.target.value); handleSubmit()}}
  />
</div>

                </label>
              </div>

              <h2 className="mb-4 mr-2 text-2xl font-bold text-stone-900 headNotify">
                Recent Notifications
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {notify.map((n, i) => (
                  <div
                    key={i}
                    className={`notifyCard flex gap-4 p-4 transition-all ${n.unread?"border-green-500":"border-gray-800"}  `}
                  >
                  
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className={`font-medium ${!n.in_read && "text-black"}`}>{n.type}</h3>
                        <p className="text-sm text-gray-900">{n.message}</p>
                        <p className="text-xs text-gray-900"> {n.created_at}</p>
                      </div>
                      <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                        mark as read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

      default:
        return <p>select a tab</p>;
    }
  };
  return (
    <div className="settings">
      <h2 className="font-bold ">Settings</h2>
      <p>Manage your account settings and preferences</p>
      <div className="flex flex-row md:grid">
        <div className="settings-tabs">
          <button
            className="md:hidden"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            {open ? (
              <XMarkIcon className="w-6 h-6 text-gray-800" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-800" />
            )}
          </button>
          <div
            className={`${
              open ? "grid" : "hidden"
            } md:flex md:flex-row md:gap-4 bg-white p-2 font-semibold mr-3  rounded-lg h-2/3 md:h-auto `}
          >
            <h3
              className="mb-0 cursor-pointer hover:text-blue-500"
              onClick={() => setActiveTab("general")}
            >
              General
            </h3>
            <h3
              className="mb-0 cursor-pointer hover:text-blue-500"
              onClick={() => setActiveTab("account")}
            >
              Account
            </h3>
            <h3
              className="mb-0 cursor-pointer hover:text-blue-500"
              onClick={() => setActiveTab("notification")}
            >
              Notifications
            </h3>
            <h3
              className="mb-0 cursor-pointer hover:text-blue-500"
              onClick={() => setActiveTab("security")}
            >
              Security & Privacy
            </h3>
          </div>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Setting;

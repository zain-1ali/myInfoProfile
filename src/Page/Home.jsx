import React, { useEffect, useState } from 'react'
import './home.css'
import myimg from '../imgs/myimg.jpg'
import myinfologo from '../imgs/myinfologo.png'
import noimg from '../imgs/noimg.jpg'
import nopic from '../imgs/nopic.jpg'

import logo from '../imgs/justtag.jpg'
import { MdEmail } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import { ImLinkedin2 } from 'react-icons/im'
import { useParams } from 'react-router-dom';
import { getDatabase, onValue, ref } from "firebase/database"
import { getDownloadURL, ref as storagref } from 'firebase/storage'

import { db, storage } from '../Firebase';
// import vCard from 'vcf';
import VCard from 'vcard-creator';
import { RiInstagramFill } from 'react-icons/ri'
import { IoLogoWhatsapp } from 'react-icons/io'
import { FaLink } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { FaSnapchatGhost } from 'react-icons/fa'
import { ImYoutube2 } from 'react-icons/im'
import { FaTwitter } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { RiPinterestLine } from 'react-icons/ri'
import Loader from './Loader'
import Notfound from './notFound/Notfound'



const Home = () => {

    let { userid } = useParams();
    let db2 = getDatabase();

    let [userdata, setuserdata] = useState(null)
    let [sociallink, setsociallink] = useState([])
    let [loading, setloading] = useState(true)
    console.log(sociallink)

    // ------------------getting Data--------------------
    let [usersdata, setusersdata] = useState(null)

    useEffect(() => {
        console.log('test1')
        const starCountRef = ref(db, `User/`);
        onValue(starCountRef, async (snapshot) => {
            console.log(snapshot.val())
            const data = await snapshot.val();
            setusersdata(Object.values(data))



            // if (data.links) {
            //     setsociallink(Object.values(data.links))

            // }

        });

    }, [])

    console.log(usersdata)

    let [notfound, setnotfound] = useState(false)
    let [endpoint, setendpoint] = useState('')


    // useEffect(() => {

    //         console.log('test2')
    //         usersdata?.map((elm) => {
    //             if (userid === elm?.id || userid === elm?.username) {
    //                 console.log(elm)
    //                 setendpoint(elm?.id)
    //             }
    //             else {
    //                 setnotfound(true)
    //             }

    //         })

    // }, [usersdata])


    useEffect(() => {


        if (usersdata) {

            let checklist = usersdata?.some((elm) => {
                return userid === elm?.id || userid === elm?.username || elm?.tagUid?.some((el) => { return userid == el?.id })
            })
            console.log(checklist)
            if (checklist) {
                console.log('true')
                usersdata?.map((elm) => {
                    if (userid === elm?.id || userid === elm?.username) {
                        console.log(elm)
                        setuserdata(elm)
                        // if (elm.links) {
                        //     console.log(elm)
                        // setsociallink(Object.values(elm?.links ))
                        setsociallink(elm?.links)

                        // }
                        setloading(false)
                    }
                    else if (elm?.tagUid?.some((el) => { return userid == el?.id })) {
                        setuserdata(elm)
                        setsociallink(elm?.links)
                        setloading(false)
                    }

                })
            }
            else {
                setloading(false)
                setnotfound(true)
            }

        }
    }, [usersdata])

    // console.log()
    // useEffect(() => {

    //     if (endpoint) {
    //         console.log('test3')
    //         const starCountRef = ref(db, `User/${endpoint}`);
    //         onValue(starCountRef, async (snapshot) => {
    //             console.log(snapshot.val())
    //             const data = await snapshot.val();
    //             setuserdata(data)
    //             setloading(false)
    //             if (data.links) {
    //                 setsociallink(Object.values(data.links))

    //             }

    //         });
    //     }
    // }, [endpoint])











    // Download Vcf file

    let downloadVcf = async () => {
        // Define a new vCard
        const myVCard = new VCard()

        // Some variables
        const lastname = userdata?.name
        const firstname = ''
        const additional = ''
        const prefix = ''
        const suffix = ''

        myVCard
            .addName(lastname, firstname, additional, prefix, suffix)
            .addCompany(userdata?.workPlace)
            .addJobtitle(userdata?.job)
            .addRole(userdata?.department)
            .addEmail(userdata?.email)
            .addPhoneNumber(userdata?.phone)


        sociallink?.map((link) => {
            myVCard.addSocial(link.value, link.name, link.name)
        })

        const vcardData = myVCard.toString();
        const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'myvcard.vcf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    let returnSocialIcons = (name) => {
        if (name === 'Instagram') {
            return <RiInstagramFill className='text-white text-md' />
        }
        else if (name === 'LinkedIn') {
            return <BsLinkedin className='text-white text-md' />
        }
        else if (name === 'Email') {
            return <MdEmail className='text-white text-md' />
        }
        else if (name === 'Whatsapp') {
            return <IoLogoWhatsapp className='text-white text-md' />
        }
        else if (name === 'Website') {
            return <FaLink className='text-white text-md' />
        }
        else if (name === 'Phone') {
            return <BsTelephoneFill className='text-white text-md' />
        }
        else if (name === 'Snapchat') {
            return <FaSnapchatGhost className='text-white text-md' />
        }
        else if (name === 'Youtube') {
            return <ImYoutube2 className='text-white text-md' />
        }
        else if (name === 'Pinterest') {
            return <RiPinterestLine className='text-white text-md' />
        }
        else if (name === 'Twitter') {
            return <FaTwitter className='text-white text-md' />
        }
        else if (name === 'Tiktok') {
            return <FaTiktok className='text-white text-md' />
        }

    }


    let returnSocialUrl = (name, url) => {
        if (name === 'Instagram') {
            return `https://www.instagram.com/${url}/`
        }
        else if (name === 'LinkedIn') {
            return url
        }
        else if (name === 'Email') {
            return `mailto:${url}`
        }
        else if (name === 'Whatsapp') {
            return `https://wa.me/${url}`
        }
        else if (name === 'Website') {
            return url
        }
        else if (name === 'Phone') {
            return `tel:${url}`
        }
        else if (name === 'Snapchat') {
            return `https://www.snapchat.com/add/${url}`
        }
        else if (name === 'Youtube') {
            return url
        }
        else if (name === 'Pinterest') {
            return url
        }
        else if (name === 'Twitter') {
            return `https://www.Twitter.com/${url}`
        }
        else if (name === 'Tiktok') {
            return `https://tiktok.com/@${url}`
        }
    }


    let returnString = (str) => {
        if (str?.length > 33) {
            return str?.substring(0, 32);
        }
    }


    let tempurl = 'gs://myinfo-59d5d.appspot.com/customLogoImg:j68jZdRVggMnUKCor28OnaWEnlw1.png'
    // getting image from storage
    let [profileurl, setprofileurl] = useState('')

    let returnImage = (url) => {

        if (url) {

            const fileRef = storagref(storage, url);


            getDownloadURL(fileRef).then((URL) => {
                console.log(URL)
                // img = URL

                // setprofileurl(URL)

            }).catch((error) => {
                console.log(error)
            });
            return URL


        }
    }

    useEffect(() => {
        if (userdata?.profileUrl) {
            // const storage = getStorage();
            const fileRef = storagref(storage, userdata?.profileUrl);
            // console.log(loginUserData.profileUrl);

            getDownloadURL(fileRef).then((URL) => {
                console.log(URL)
                setprofileurl(URL)

            }).catch((error) => {
                console.log(error)
            });
        }
    }, [userdata?.profileUrl])

    let [coverurl, setcoverurl] = useState('')
    useEffect(() => {
        if (userdata?.coverUrl) {
            // const storage = getStorage();
            const fileRef = storagref(storage, userdata?.coverUrl);
            // console.log(loginUserData.profileUrl);

            getDownloadURL(fileRef).then((URL) => {
                console.log(URL)
                setcoverurl(URL)

            }).catch((error) => {
                console.log(error)
            });
        }
    }, [userdata?.coverUrl])


    let [logourl, setlogourl] = useState('')
    useEffect(() => {
        if (userdata?.logoUrl) {
            // const storage = getStorage();
            const fileRef = storagref(storage, userdata?.logoUrl);
            // console.log(loginUserData.profileUrl);

            getDownloadURL(fileRef).then((URL) => {
                console.log(URL)
                setlogourl(URL)

            }).catch((error) => {
                console.log(error)
            });
        }
    }, [userdata?.logoUrl])



    let [urls, seturls] = useState([])
    useEffect(() => {
        if (sociallink) {

            sociallink?.map((elm) => {

                const fileRef = storagref(storage, elm?.image);


                getDownloadURL(fileRef).then((URL) => {
                    console.log(URL)
                    seturls(prev => [...prev, { name: elm?.name, url: URL, value: elm?.value }])

                }).catch((error) => {
                    console.log(error)
                });



            })

        }
    }, [sociallink])

    console.log(notfound)
    console.log(userdata)
    // sociallink
    return (
        <>
            {loading ? <Loader /> :
                <>
                    {notfound ? <Notfound /> :
                        <div className='home-main'>
                            <img src={coverurl ? coverurl : `https://placehold.co/400x200`} alt="" className='h-[200px] w-[100%] object-cover z-[5]' />
                            <div className="custom-shape-divider-bottom-1679989699" style={{ zIndex: '10' }}>
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" style={userdata?.backgroundColor ? { fill: `${userdata?.backgroundColor}` } : { fill: '#0b6e99' }}></path>
                                </svg>
                            </div>


                            <div className="custom-shape-divider-bottom-1679989698" style={{ zIndex: '20' }}>
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill2"></path>
                                </svg>
                            </div>
                            <img src={logourl ? logourl : "https://placehold.co/70x70"} alt="logo" className='rounded-full h-[70px] w-[70px] absolute top-[180px]  right-5 border-2 border-white ' style={{ zIndex: '50' }} />
                            <div className='max-h-[100px] max-w-[100px] shadow-lg absolute left-10 top-[140px] rounded-full border ' style={{ zIndex: '40' }}>
                                <img src={profileurl ? profileurl : `https://placehold.co/100x100`} alt="" className='rounded-full h-[100px] w-[100px]' />

                            </div>

                            <div className='h-[150px]  border-l border-dotted   border-black p-2 ml-6 mt-16'>
                                <h2 className='font-medium text-2xl'>{userdata?.name}</h2>
                                <h2 className='font-medium mt-2 text-lg'>{userdata?.job}</h2>
                                <h2 className='font-medium text-lg text-[#0b6e99] mt-2' style={userdata?.backgroundColor ? { color: `${userdata?.backgroundColor}` } : { color: '#0b6e99' }}>{userdata?.workPlace}</h2>
                                <h2 className=' text-lg text-gray-500 mt-2'>{userdata?.email}</h2>



                            </div>

                            <div className='ml-6 mt-6'>
                                {urls?.map((elm) => {
                                    return <a target='_blank' href={elm?.value}> <div className='flex mt-4'>
                                        <div className='h-[30px] w-[30px] rounded-full  flex justify-center items-center ' style={userdata?.backgroundColor ? { backgroundColor: `${userdata?.backgroundColor}` } : { backgroundColor: '#0b6e99' }}>
                                            <img src={elm?.url} alt="" className='h-[20px] w-[20px]' />
                                            {/* {returnSocialIcons(elm.name)} */}
                                        </div>
                                        <h2 className='font-medium text-gray-500 ml-3'>{elm?.name}</h2>
                                    </div></a>
                                })}
                            </div>
                            <div className='flex justify-center w-[100%] mt-[55px]'>
                                <div className=' w-[260px] flex justify-center items-center border h-[50px] rounded-3xl  text-white font-medium cursor-pointer text-lg' style={userdata?.backgroundColor ? { backgroundColor: `${userdata?.backgroundColor}` } : { backgroundColor: '#0b6e99' }} onClick={() => downloadVcf()}>
                                    <BsFillPersonVcardFill className='mr-2 mt-[2px]' />
                                    Save Contact
                                </div>
                            </div>
                            <br />

                        </div >
                        // :
                        // <Loader />
                    }

                </>
            }
        </>
    )
}

export default Home
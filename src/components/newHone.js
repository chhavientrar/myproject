import React, { useState } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaGitAlt, FaFreeCodeCamp } from "react-icons/fa";
import { IoLogoJavascript, IoLogoFirebase, IoDocument } from "react-icons/io5";
import { SiTailwindcss, SiRedux, SiC, SiCoursera, SiUdemy, SiRecoil } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { MdDesignServices } from "react-icons/md";
import { RiPresentationFill, RiCoreosLine} from "react-icons/ri";
import { FaGofore } from "react-icons/fa6";

function Home() {
    const [option, setOption] = useState("skills");

  return (
    <div className='lg:w-[800px] lg:border-r border-b box-border overflow-x-hidden'>
        <div>
            <div className='pt-10 lg:pt-20 text-center space-y-1'>
                <div className='w-20 mx-auto'>
                    <img src="/static/vikas.jpg" alt="vikasipar" className='w-full rounded-full border-2 border-gray-200'/>
                </div>
                <h2 className='text-2xl font-semibold flex justify-center items-center'>Vikas Ipar <img src="/static/tick.svg" alt="tick" className='ml-1'/></h2>
                <p className='text-sm text-gray-600 w-[88%] md:w-[60%] mx-auto'>I'm a <span className='border-b-2 border-[#3ec975]/60'>front-end developer</span> with experience in many different languages, and technologies. I'm always looking for new challenges to tackle.</p>
            </div>
        </div>

        <div>
            <div className='mb-16 lg:mb-9'>
                <ul className='flex flex-wrap mt-10 lg:mt-12 w-fit mx-auto space-x-4 text-base text-[#959da5]'>
                    <li className={option==='skills'? 'text-[#00aa45] font-semibold border-b-2 border-[#00aa45]':'cursor-pointer'} onClick={()=>setOption('skills')}>Skills</li>
                    <li className={option==='edu'? 'text-[#00aa45] font-semibold border-b-2 border-[#00aa45]':'cursor-pointer'} onClick={()=>setOption('edu')}>Education</li>
                    <li className={option==='other'? 'text-[#00aa45] font-semibold border-b-2 border-[#00aa45]':'cursor-pointer'} onClick={()=>setOption('other')}>Other</li>
                </ul>
                {option==='skills' && <div className='font-semibold'>
                    <ul className='flex flex-wrap justify-center items-end text-sm md:text-base w-[90%] mx-auto space-x-2 lg:space-x-9 space-y-3 lg:p-5 mt-3 mb-10 lg:my-10'>
                    <li className='flex items-center'><FaHtml5 className='mx-2 text-[#00aa45]'/>HTML</li>
                    <li className='flex items-center'><FaCss3Alt className='mx-2 text-[#00aa45]'/>CSS</li>
                    <li className='flex items-center'><SiTailwindcss className='mx-2 text-[#00aa45]'/>Tailwind CSS</li>
                    <li className='flex items-center'><IoLogoJavascript className='mx-2 text-[#00aa45]'/>JavaScript</li>
                    <li className='flex items-center'><FaReact className='mx-2 text-[#00aa45]'/>React</li>
                    <li className='flex items-center'><SiRedux className='mx-2 text-[#00aa45]'/>Redux</li>
                    <li className='flex items-center'><SiRecoil className='mx-2 text-[#00aa45]'/>Recoil</li>
                    <li className='flex items-center'><IoLogoFirebase className='mx-2 text-[#00aa45]'/>Firebase</li>
                    <li className='flex items-center'><FaGitAlt className='mx-2 text-[#00aa45]'/>Git/GitHub</li>
                    <li className='flex items-center'><TbBrandFramerMotion className='mx-2 text-[#00aa45]'/>Framer Motion</li>
                    <li className='flex items-center'><SiC className='mx-2 text-[#00aa45]'/>C Language</li>
                    </ul>

                    <div className='w-[92%] lg:w-[80%] mx-auto'>
                    <h2 className='text-lg text-[#000000] mb-3'>Certifications:</h2>
                    <ul className='text-sm md:text-base font-normal'>
                        <li className='flex items-center my-3 lg:my-auto'><SiCoursera className='mx-5 text-base text-[#00aa45]'/>Coursera - Advanced React: Meta Front-End Developer Specialization.</li>
                        <li className='flex items-center my-3 lg:my-auto'><FaFreeCodeCamp className='mx-5 text-xl text-[#00aa45]'/>freeCodeCamp - Responsive Web Design Course Certificate.</li>
                        <li className='flex items-center my-3 lg:my-auto'><SiUdemy className='mx-5 text-base text-[#00aa45]'/>Udemy - The Complete ReactJs Course.</li>
                        <li className='flex items-center my-3 lg:my-auto'><FaGofore className='mx-5 text-base text-[#00aa45]'/>Great Learning - UI/UX for Beginners Course.</li>
                        <li className='flex items-center'><RiCoreosLine className='mx-5 text-base text-[#00aa45]'/>Core2Web - The Complete C Programming Course</li>
                    </ul>
                    </div>
                </div>}
                {option==='edu' && <div className='w-[80%] mx-auto my-12'>
                    <div className='my-5 text-[#0d0d0d]'>
                        <h2 className='flex justify-between text-base md:text-lg font-semibold'><span>BE in Information Technology</span><span className='text-sm md:text-base'>2023</span></h2>
                        <h4 className='text-[#6a737d] text-sm md:text-base'>Sinhgad College of Engineering, Pune</h4>
                        <h4 className='text-[#6a737d] text-sm md:text-base'>CGPA: 8.3</h4>
                    </div>
                    <div className='my-5 text-[#0d0d0d]'>
                        <h2 className='flex justify-between text-base md:text-lg font-semibold'><span>HSC</span><span className='text-sm md:text-base'>2019</span></h2>
                        <h4 className='text-[#6a737d] text-sm md:text-base'>Arts, Commerce & Science College, Nandgaon, Nashik</h4>
                        <h4 className='text-[#6a737d] text-sm md:text-base'>Percentage: 74%</h4>
                    </div>
                    <div className='my-5 text-[#0d0d0d]'>
                        <h2 className='flex justify-between text-base lg:text-lg font-semibold'><span>SSC</span><span className='text-sm md:text-base'>2017</span></h2>
                        <h4 className='text-[#6a737d] text-sm md:text-base'>New English School, Nandgaon, Nashik</h4>
                        <h4 className='text-[#6a737d] text-sm md:text-base'>Percentage: 86%</h4>
                    </div>
                </div>}
                {option==='other'&&
                    <ul className='my-10 text-sm font-normal w-[85%] mx-auto space-y-3 text-[#02060a]'>
                        <li className='flex items-center my-3 lg:my-auto'><MdDesignServices className='text-2xl mx-5 text-[#00aa45]'/>Received a certificate for participating in PICT's Impetus and Concepts’23 project competition, 2023.</li>
                        <li className='flex items-center my-3 lg:my-auto'><RiPresentationFill className='text-2xl mx-5 text-[#00aa45]'/>Awarded a certificate for involvement in Astrothon by Sinhgad Academy of Engineering, 2023.</li>
                        <li className='flex items-start'><IoDocument className='text-5xl mx-5 text-[#00aa45]'/>Received certificates for publishing two research papers on GIS Science Journal during my final year of engineering: 'CareTracer A Safety Band for Children' and 'Implementing Near-Field Communication System for Passive Child Tracking'.</li>
                    </ul>
                }
            </div>
        </div>
    </div>
  )
}

export default Home;
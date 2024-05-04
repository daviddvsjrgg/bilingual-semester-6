import React, { useEffect, useState } from 'react'
import NavbarCat from '../../../../../components/Navbar/NabarCat'
import Bottom from '../../../../../components/BottomBar/Bottom'
import { onValue, ref } from 'firebase/database';
import { database } from '../../../../../config/firebase/firebase';

const Kalkulasi = () => {


    // Waktu UTC+7
    const [ time, setTime ] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Beri Makan Langsung
    const [ buttonBeriClicked, setButtonBeriClicked ] = useState(false)

    const handleClickBeri = async () => {
        try {
            console.log("jalankan servo")
            setButtonBeriClicked(true)
            buttonSimpanSehariClicked(true)
            buttonBeriTiapWaktuClicked(true)
            setTimeout(() => {
                setButtonBeriClicked(false)
                buttonSimpanSehariClicked(false)
                buttonBeriTiapWaktuClicked(false)
            }, 5000);
        } catch (error) {
            console.log(error)
        }
    }

    // Makan Berapa Kali Sehari?
    const [ buttonSimpanSehari, buttonSimpanSehariClicked ] = useState(false)

    const handleClickSehari = async () => {
        try {
            console.log("jalankan waktu berapa hari sekali?")
            buttonSimpanSehariClicked(true)
            setButtonBeriClicked(true)
            buttonBeriTiapWaktuClicked(true)
            setTimeout(() => {
                buttonSimpanSehariClicked(false)
                setButtonBeriClicked(false)
                buttonBeriTiapWaktuClicked(false)
            }, 5000);
        } catch (error) {
            console.log(error)
        }
    }

    // Beri Makan Setiap (waktu) sekali
    const [ buttonBeriTiapWaktu, buttonBeriTiapWaktuClicked ] = useState(false)

    const handleClickTiapWaktu = async () => {
        try {
            console.log("jalankan makan tiap waktu")
            buttonBeriTiapWaktuClicked(true)
            setButtonBeriClicked(true)
            buttonSimpanSehariClicked(true)
            setTimeout(() => {
                buttonBeriTiapWaktuClicked(false)
                setButtonBeriClicked(false)
                buttonSimpanSehariClicked(false)
            }, 5000);
        } catch (error) {
            console.log(error)
        }
    }

    //   Get Berat

    const [loadCellData, setLoadCellData] = useState([]);

    useEffect(() => {
      const loadCellRef = ref(database, 'data');
      const unsubscribe = onValue(loadCellRef, (snapshot) => {
        if (snapshot.exists()) {
          const sensorData = snapshot.val();
          const dataArray = Object.entries(sensorData)
            .map(([sensor, data]) => ({
              sensor,
              ...data,
            }))
            .filter(item => item.loadCell !== undefined); // Filter only loadCell data
          setLoadCellData(dataArray);
        } else {
          console.log('No data available');
        }
      });
  
      return () => unsubscribe();
    }, []);
      
  
  


  return (
    <div className="min-h-full">
      <NavbarCat />
      <header className="bg-white drop-shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cat Feeder</h1>
        </div>
      </header>

      {/* Start - Content */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Stat */}
            {/* Section 1 */}

            <div className="bg-white border border-gray-200 lg:rounded-lg p-6 md:px-6 md:py-6 lg:shadow-xl">
                      <div className="inline-flex">
                        <div className="bg-yellow-50 text-gray-600 lg:ml-3  items-center px-2.5 py-0.5 rounded-md mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                            </svg>
                        </div>
                        <div className="text-xl font-medium ml-2 text-gray-700">Beri Makan Kucing</div>
                      </div>
                      <section className="bg-white mt-2">
                          <div className="grid md:grid-cols-2 gap-4 rounded-lg p-2 md:p-4">
                            <div className='bg-gray-50 border border-gray-200 p-4'>
                                  <div className=" flex">
                                      <svg
                                      className='text-gray-800'
                                        viewBox="0 0 512 512"
                                        fill="currentColor"
                                        height="4em"
                                        width="4em"
                                        >
                                            <path d="M288 96c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm58.5 32c3.5-10 5.5-20.8 5.5-32 0-53-43-96-96-96s-96 43-96 96c0 11.2 1.9 22 5.5 32H120c-22 0-41.2 15-46.6 36.4l-72 288c-3.6 14.3-.4 29.5 8.7 41.2S33.2 512 48 512h416c14.8 0 28.7-6.8 37.8-18.5s12.3-26.8 8.7-41.2l-72-288C433.2 143 414 128 392 128h-45.5z" />
                                        </svg>
                                      <p className="font-extrabold text-xl text-gray-600 ml-4 mt-3">
                                      {loadCellData ? (
                                        <>
                                        {loadCellData && loadCellData.map((data) => (
                                                <div key={data.sensor}>
                                                <p>{data.loadCell} gram</p>
                                                </div>
                                            ))}
                                        </>
                                      ) : (
                                        <>
                                         <p className='animate-pulse text-gray-500'>Loading...</p>
                                        </>
                                      )}
                                        </p>
                                    </div>
                                    <p className="font-extrabold text-md text-gray-400 ml-2 mt-8">Total Berat Pakan</p>
                                  </div>
                                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 md:p-4">
                                        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                                <span className="countdown font-mono text-5xl">
                                                <span style={{"--value":hours}}></span>
                                                </span>
                                                Jam
                                            </div> 
                                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                                <span className="countdown font-mono text-5xl">
                                                <span style={{"--value":minutes}}></span>
                                                </span>
                                                Menit
                                            </div> 
                                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                                <span className="countdown font-mono text-5xl">
                                                <span style={{"--value":seconds}}></span>
                                                </span>
                                                Detik
                                            </div>
                                        </div>
                                        <p className="font-extrabold text-md text-gray-400 ml-2 mt-2">Waktu WIB</p>
                                    </div>
                              </div>
                      </section>
                        <div className="divider"></div>
                          <>
                            <section className="bg-white mt-2 mb-5">
                                <div className="grid md:grid-cols-1">
                                    <div className="lg:grid lg:grid-cols-6">
                                        <div className="col-start-1 col-end-2">
                                        <div className="card  w-auto lg:w-96 mt-2  h-96  bg-gray-50/75 shadow-xl">
                                        <figure className="px-10 pt-10">
                                            <img src="https://media.istockphoto.com/id/147304003/photo/hungry-kitty.webp?b=1&s=170667a&w=0&k=20&c=kAvmHTI9ibRZlH2biQ-ETLGU0_9oqOrE8-xQe6JaLRY=" alt="Shoes" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">Meow!</h2>
                                            <p>Beri makan kucing sekarang?</p>
                                            <div className="card-actions">
                                            {buttonBeriClicked ? (
                                                <>
                                                <button
                                                disabled
                                                 className="rounded-md h-12  text-white bg-indigo-300 animate-pulse hover:text-white transition-all duration-200 w-32 mt-1">Loading...</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                    onClick={handleClickBeri}
                                                    className="rounded-md h-12  text-white bg-indigo-500 hover:text-white hover:bg-indigo-600 transition-all duration-200 hover:scale-110  w-32 mt-1">Beri</button>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        <div className="col-start-3 col-end-4">
                                        <div className="card w-auto lg:w-96 mt-2 h-96  bg-gray-50/75 shadow-xl p-5">
                                        <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Sehari berapa kali makan?</span>
                                        </div>
                                        <input type="text" placeholder="contoh: 4" className="input input-bordered w-full max-w-xs" />
                                        <div className="label">
                                            <span className="label-text-alt invisible">Bottom </span>
                                            <span className="label-text-alt">
                                                {buttonSimpanSehari ? (
                                                    <>
                                                        <button
                                                        disabled
                                                        className="rounded-md h-8 text-white bg-indigo-300 animate-pulse transition-all duration-200 w-28 mt-1">Loading...</button>
                                                    </>
                                                ): (
                                                    <>
                                                        <button 
                                                        onClick={handleClickSehari}
                                                        className="rounded-md h-8 text-white bg-indigo-500 hover:text-white hover:bg-indigo-600 transition-all duration-200 hover:scale-110  w-28 mt-1">Simpan</button>
                                                    </>
                                                )}
                                            </span>
                                        </div>    
                                        </label>
                                        <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Beri makan Otomatis</span>
                                        </div>
                                        <input type="text" placeholder="contoh: 00:01:00 (Setiap 1 menit)" className="input input-bordered w-full max-w-xs" />
                                        <div className="label">
                                            <span className="label-text-alt invisible">Bottom </span>
                                            <span className="label-text-alt">
                                            {buttonBeriTiapWaktu ? (
                                                    <>
                                                        <button
                                                        disabled
                                                        className="rounded-md h-8 text-white bg-indigo-300 animate-pulse transition-all duration-200 w-28 mt-1">Loading...</button>
                                                    </>
                                                ): (
                                                    <>
                                                        <button 
                                                        onClick={handleClickTiapWaktu}
                                                        className="rounded-md h-8 text-white bg-indigo-500 hover:text-white hover:bg-indigo-600 transition-all duration-200 hover:scale-110  w-28 mt-1">Simpan</button>
                                                    </>
                                                )}
                                            </span>
                                        </div>    
                                        </label>
                                        </div>
                                        </div>
                                        <div className="col-start-5 col-end-6">
                                        <div className="card w-auto lg:w-96 mt-2 h-96 bg-gray-50/75 shadow-xl p-6">
                                            <div className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                                </svg>
                                            <p>Riwayat</p>
                                            <div className="divider"></div> 
                                            </div>
                                            <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 overflow-x-hidden overflow-y-scroll">
                                                <li class="flex items-center">
                                                    <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                    </svg>
                                                    At least 10 characters
                                                </li>
                                                <li class="flex items-center">
                                                    <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                    </svg>
                                                    At least 10 characters
                                                </li>
                                                <li class="flex items-center">
                                                    <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                    </svg>
                                                    At least 10 characters
                                                </li>
                                            </ul>

                                        </div>
                                        </div>
                                        </div>
                                    </div>
                            </section>
                          </>
                          
                    </div>
            {/* End Stat */}
        </div>
      </main>
      {/* End - Content */}
      
      <Bottom />
    </div>
  )
}

export default Kalkulasi
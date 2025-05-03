'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import {useState} from "react";
import Details from "@/components/misc/details";


export default function CloudButton() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div onClick={() => setIsOpen(true)} className={'absolute bottom-[-1px] right-[-2px] bg-[#181F4B] p-[9px]'}>
                <button className={'cloud-button p-[9px]'}>
                    <object className={'pointer-events-none'} data="/media/icons/cloud.svg"/>
                </button>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-[20px] top-[257px] rounded-[12px]">
                    <DialogPanel className="max-w-lg space-y-4 bg-[#212752] p-[11px] rounded-[12px]">
                        <div className={'text-[13px] font-bold flex gap-[6px] flex-wrap justify-center'}>
                            <div className={'flex flex-col gap-[8px] justify-center items-center'}>
                                <div className={'coef-text'}>
                                    12
                                </div>
                                <div className={'btn-red'}>
                                    3.41x
                                </div>
                            </div>
                            <div className={'flex flex-col gap-[8px] justify-center items-center'}>
                                <div className={'coef-text'}>
                                    12
                                </div>
                                <div className={'btn-blue-light'}>
                                    3.41x
                                </div>
                            </div>
                            <div className={'flex flex-col gap-[8px] justify-center items-center'}>
                                <div className={'coef-text'}>
                                    12
                                </div>
                                <div className={'btn-violet-light'}>
                                    3.41x
                                </div>
                            </div>
                            <div className={'flex flex-col gap-[8px] justify-center items-center'}>
                                <div className={'coef-text'}>
                                    MAX
                                </div>
                                <div className={'btn-orange-light'}>
                                    3.41x
                                </div>
                            </div>

                        </div>
                        <div className={'line'}></div>
                        <div className={'text-[13px] font-bold flex gap-[6px] flex-wrap justify-center'}>
                            <Details />
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                            <div className={'btn-blue'}>
                                3.41x
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
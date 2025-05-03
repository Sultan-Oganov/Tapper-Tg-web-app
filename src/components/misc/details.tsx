'use client';

import {Dialog, DialogPanel} from '@headlessui/react'
import { useState } from 'react'

export default function Details() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <div onClick={() => setIsOpen(true)} className={'btn-blue'}>
                3.41x
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-[20px]">
                    <DialogPanel className="space-y-4 w-full">
                        <div className={'w-full'}>
                            <div className={"details_top w-full"}>
                                <div className={"details_top_left"}>
                                    <div className={"details_top_left_title"}>
                                        Детали раунда
                                    </div>
                                    <div className={"details_top_left_multiplier"}>
                                        11.32X
                                    </div>
                                </div>
                                <div onClick={() => setIsOpen(false)} className={"details_top_close"}>
                                    <svg width="15.000000" height="13.000000" viewBox="0 0 15 13" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path id="Vector"
                                              d="M11.07 1.26L11.07 1.23C11.47 0.84 12.09 0.84 12.49 1.23C12.88 1.63 12.88 2.25 12.49 2.65L12.46 2.65L11.07 1.26ZM3.65 11.46L3.65 11.49C3.25 11.88 2.63 11.88 2.23 11.49C1.84 11.09 1.84 10.47 2.23 10.07L2.26 10.07L3.65 11.46Z"
                                              fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
                                        <path id="Vector" d="M11.78 1.94L2.94 10.78" stroke="#FFFFFF"
                                              strokeOpacity="1.000000"
                                              strokeWidth="2.000000" strokeLinecap="round"/>
                                        <path id="Vector"
                                              d="M12.59 10.21L12.62 10.21C13.02 10.6 13.02 11.23 12.62 11.62C12.23 12.02 11.6 12.02 11.21 11.62L11.21 11.59L12.59 10.21ZM2.4 2.78L2.37 2.78C1.97 2.39 1.97 1.76 2.37 1.37C2.76 0.97 3.39 0.97 3.78 1.37L3.78 1.4L2.4 2.78Z"
                                              fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
                                        <path id="Vector" d="M11.91 10.91L3.08 2.08" stroke="#FFFFFF"
                                              strokeOpacity="1.000000"
                                              strokeWidth="2.000000" strokeLinecap="round"/>
                                    </svg>

                                </div>
                            </div>
                            <div className={"details_info"}>

                                <div className={"details_info_code"}>
                                    <div className={"details_info_code_text"}>
                                        34rwefrbgfreiw3e0-294rfeuifdjosdfgfrewq
                                    </div>
                                    <svg width="18.000000" height="18.000000" viewBox="0 0 18 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip2646_1854)">
                                            <path id="Vector"
                                                  d="M2.43 6.75C2.43 5.6 2.89 4.5 3.7 3.7C4.5 2.89 5.6 2.43 6.75 2.43L12 2.43C12.15 2.43 12.3 2.49 12.4 2.6C12.51 2.7 12.57 2.85 12.57 3C12.57 3.14 12.51 3.29 12.4 3.39C12.3 3.5 12.15 3.56 12 3.56L6.75 3.56C5.9 3.56 5.09 3.89 4.49 4.49C3.89 5.09 3.56 5.9 3.56 6.75L3.56 12.08C3.56 12.22 3.5 12.37 3.39 12.47C3.29 12.58 3.14 12.64 3 12.64C2.85 12.64 2.7 12.58 2.6 12.47C2.49 12.37 2.43 12.22 2.43 12.08L2.43 6.75Z"
                                                  fill="#FFFFFF" fillOpacity="0.480000" fillRule="nonzero"/>
                                            <path id="Vector"
                                                  d="M13.8 5.09C11.35 4.82 8.89 4.82 6.44 5.09C6.1 5.13 5.79 5.28 5.55 5.52C5.31 5.76 5.15 6.07 5.11 6.41C4.82 8.87 4.82 11.36 5.11 13.83C5.15 14.17 5.31 14.48 5.55 14.72C5.79 14.96 6.1 15.11 6.44 15.15C8.87 15.42 11.37 15.42 13.8 15.15C14.14 15.11 14.45 14.96 14.69 14.72C14.93 14.48 15.09 14.17 15.13 13.83C15.42 11.36 15.42 8.87 15.13 6.41C15.09 6.07 14.93 5.76 14.69 5.52C14.45 5.28 14.14 5.13 13.8 5.09Z"
                                                  fill="#FFFFFF" fillOpacity="0.480000" fillRule="nonzero"/>
                                        </g>
                                    </svg>
                                </div>

                                <div className={"details_info_taps"}>
                                    <div className={"info_taps_card py-[8px]"}>
                                        All players
                                    </div>
                                    <div className={"info_taps_card py-[8px]"}>
                                        My bets
                                    </div>
                                    <div className={"info_taps_card py-[8px]"}>
                                        Top bets
                                    </div>
                                </div>

                                <div className={"details_info_cards"}>
                                    <div className={"details_info_card"}>
                                        <img src={"/media/icons/man_blue.png"}/>
                                        <div className={"details_info_card_amount-multiplier"}>
                                            <div className={"details_info_card_amount"}>
                                                <img src={"/media/icons/bitcoin.png"}/>
                                                <div className={"trade_card_amount_element_left_quantity"}>
                                                    20,56K
                                                </div>
                                            </div>
                                            <div className={"details_info_card_multiplier"}>
                                                3.41x
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"details_info_card"}>
                                        <img src={"/media/icons/man_blue.png"}/>
                                        <div className={"details_info_card_amount-multiplier"}>
                                            <div className={"details_info_card_amount"}>
                                                <img src={"/media/icons/bitcoin.png"}/>
                                                <div className={"trade_card_amount_element_left_quantity"}>
                                                    20,56K
                                                </div>
                                            </div>
                                            <div className={"details_info_card_multiplier-rocket"}>
                                                <svg width="26.313477" height="26.313477" viewBox="0 0 26.3135 26.3135"
                                                     fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path id="Vector"
                                                          d="M0.44 12.56C0.23 12.54 0.14 12.81 0.32 12.94C0.59 13.15 0.93 13.37 1.25 13.5C2.03 13.81 2.96 13.91 3.15 13.84C3.34 13.77 2.9 14.2 2.63 14.3C2.41 14.38 2.16 14.38 1.95 14.33C1.74 14.29 1.63 14.54 1.79 14.69C1.8 14.71 1.82 14.72 1.84 14.74C1.99 14.88 2.61 15.44 3.49 15.75C4.45 16.08 5.32 15.97 5.88 15.83C6.06 15.78 6.06 15.53 5.89 15.43C5.14 15.03 4.65 14.22 4.69 13.4C4.73 12.65 5.19 12.04 5.85 11.78C6.03 11.72 6.01 11.45 5.82 11.38C5.34 11.21 4.77 11.1 4.21 11.24C3.49 11.42 3.27 11.88 2.57 12.23C2.11 12.47 1.44 12.66 0.44 12.56Z"
                                                          fill="#FFFFFF" fillOpacity="0.240000" fillRule="nonzero"/>
                                                    <path id="Vector"
                                                          d="M25.94 13.43C25.99 13.35 25.99 13.26 25.93 13.19C23.62 10.19 20.58 8.73 16.83 8.81C16.75 8.81 16.67 8.76 16.63 8.69C16.6 8.62 16.56 8.55 16.53 8.48C16.52 8.47 16.51 8.46 16.5 8.44C16.49 8.43 16.49 8.42 16.48 8.4C16.06 7.67 15.4 7.04 14.45 6.55C14.42 6.54 14.4 6.53 14.37 6.53C12.78 6.41 11.22 6.83 9.68 7.44C9.55 7.49 9.52 7.62 9.56 7.72C9.94 7.85 10.29 7.98 10.61 8.13C11.7 8.51 12.51 8.99 12.75 9.68C12.78 9.77 12.75 9.87 12.68 9.93C12.12 10.36 11.65 10.82 11.27 11.28C11.25 11.3 11.23 11.33 11.23 11.36C10.78 12.79 10.83 14.16 11.26 15.5C11.27 15.52 11.28 15.54 11.3 15.56C11.69 16.09 12.15 16.53 12.68 16.91C12.77 16.97 12.8 17.08 12.75 17.18C12.61 17.46 12.41 17.7 12.17 17.91C11.57 18.42 10.71 18.75 9.74 19.01C9.54 19.06 9.52 19.34 9.72 19.41C9.8 19.45 9.88 19.48 9.96 19.51C11.42 20.06 12.89 20.43 14.39 20.31C14.42 20.31 14.45 20.3 14.48 20.29C15.54 19.73 16.25 19 16.66 18.15C16.7 18.07 16.78 18.02 16.86 18.03C18.98 18.07 20.88 17.63 22.54 16.69C22.92 16.47 23.28 16.23 23.64 15.96C24.95 14.95 25.72 13.81 25.94 13.43ZM18.21 14.63C17.52 13.95 17.52 12.84 18.21 12.15C18.89 11.47 20 11.47 20.69 12.15C21.37 12.83 21.37 13.94 20.68 14.63C20 15.31 18.89 15.31 18.21 14.63Z"
                                                          fill="#FFFFFF" fillOpacity="0.240000" fillRule="nonzero"/>
                                                </svg>

                                            </div>
                                        </div>
                                    </div>

                                    <div className={"details_info_card"}>
                                        <img src={"/media/icons/man_blue.png"}/>
                                        <div className={"details_info_card_amount-multiplier"}>
                                            <div className={"details_info_card_amount"}>
                                                <img src={"/media/icons/bitcoin.png"}/>
                                                <div className={"trade_card_amount_element_left_quantity"}>
                                                    20,56K
                                                </div>
                                            </div>
                                            <div className={"details_info_card_multiplier"}>
                                                3.41x
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

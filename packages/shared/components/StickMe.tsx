'use client'

import cn from 'clsx'
import FeatherIcon from 'feather-icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { Pin, Unpin } from './icons'

interface StickMeProps {
    children: React.ReactNode
    pinActivedAtStart: boolean
}

export function StickMeMaybe({ children, ...restprops }: StickMeProps) {
    return (
        <StickMe {...restprops} pinActivedAtStart={false}>
            {children}
        </StickMe>
    )
}

export function StickMe({ children, pinActivedAtStart = true }: StickMeProps) {
    const [pinActivated, setPinActivated] = useState(pinActivedAtStart)
    const [isSticking, setIsSticking] = useState(false)
    const dimensionsRef = useRef({
        elemHeight: 0,
        elemAspect: 0,
        wHeight: 0,
        wWidth: 0,
        isLandscape: true,
        contentWidth: 0,
        staticOffset: 0
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const navbarOffset = 64

    const updateDimensions = () => {
        if (!containerRef.current) return
        const { width, height } = containerRef.current.getBoundingClientRect()
        const nextraContentColumn = document.querySelector('.nextra-mobile-nav + div')
        dimensionsRef.current = {
            elemHeight: height,
            elemAspect: width / height,
            wHeight: window.innerHeight,
            wWidth: window.innerWidth,
            isLandscape: window.innerWidth > window.innerHeight,
            contentWidth: nextraContentColumn
                ? (nextraContentColumn as HTMLElement).offsetWidth / 2.1
                : 0,
            staticOffset: containerRef.current.offsetTop
        }
    }

    // Get initial dimensions and set up handlers
    useEffect(() => {
        updateDimensions()

        if (!pinActivated) {
            setIsSticking(false)
            document.documentElement.classList.remove('has-sticky-content')
            return
        }

        const handleResize = () => {
            updateDimensions()
            handleScroll()
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
        window.addEventListener('orientationchange', handleResize)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('orientationchange', handleResize)
            document.documentElement.classList.remove('has-sticky-content')
        }
    }, [pinActivated])

    const handleScroll = () => {
        if (
            pinActivated &&
            window.scrollY + navbarOffset > dimensionsRef.current.staticOffset
        ) {
            setIsSticking(true)
            document.documentElement.classList.add('has-sticky-content')
        } else {
            setIsSticking(false)
            document.documentElement.classList.remove('has-sticky-content')
        }
    }

    return (
        <div
            ref={containerRef}
            className="relative my-4"
            style={{
                height:
                    isSticking && !dimensionsRef.current.isLandscape
                        ? `${dimensionsRef.current.elemHeight}px`
                        : 'auto'
            }}
        >
            {isSticking && (
                // placeholder box
                <div className="flex justify-end items-center h-8 w-full">
                    <FeatherIcon icon="arrow-right" size="32" />
                </div>
            )}
            <div
                ref={contentRef}
                className={cn(
                    'transition-transform duration-300 w-fit',
                    isSticking ? 'fixed' : 'relative translate-x-px'
                )}
                style={{
                    width:
                        isSticking && dimensionsRef.current.isLandscape
                            ? `${dimensionsRef.current.contentWidth}px`
                            : 'auto',
                    top: isSticking ? navbarOffset : '',
                    translate:
                        isSticking && dimensionsRef.current.isLandscape
                            ? "100%"
                            : '0px',
                    zIndex: isSticking ? 'var(--z-fullscreen)' : 'auto'
                }}
            >
                {children}

                <button
                    onClick={() => setPinActivated(!pinActivated)}
                    className="absolute top-2 right-2 p-1.5 rounded-full shadow-md hover:bg-white/100 transition-colors z-10"
                    title={pinActivated ? 'Unpin' : 'Pin'}
                >
                    {pinActivated ? <Unpin /> : <Pin />}
                </button>

                {dimensionsRef.current.isLandscape && <style jsx global>{`
                    .nextra-sidebar,
                    .nextra-sidebar-footer,
                    .nextra-toc {
                        transition: width 0.3s ease-in-out; 
                        overflow: hidden;
                    }
                    :root.has-sticky-content .nextra-sidebar,
                    :root.has-sticky-content .nextra-sidebar-footer,
                    :root.has-sticky-content .nextra-toc {
                        width: 0px !important;
                    }
                    main {
                        transition: padding-right 0.3s ease-in-out;
                    }
                    :root.has-sticky-content main {
                        padding-right: ${dimensionsRef.current.contentWidth}px
                    }
                `}</style>}
            </div>
        </div>
    )
}

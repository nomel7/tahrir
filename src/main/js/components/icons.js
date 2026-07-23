'use strict';

import React from "react";

const base = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};

export const AllIcon = () => (
    <svg {...base} className="nav-icon">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="14" y2="18" />
    </svg>
);

export const FollowingIcon = () => (
    <svg {...base} className="nav-icon">
        <path d="M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 5 18.5V20" />
        <circle cx="9.5" cy="8" r="3.5" />
        <path d="M19 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" />
        <path d="M15 4.6a3.5 3.5 0 0 1 0 6.8" />
    </svg>
);

export const MentionsIcon = () => (
    <svg {...base} className="nav-icon">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.5 6.87" />
    </svg>
);
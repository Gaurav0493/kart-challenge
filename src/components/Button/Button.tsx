import React from 'react'
import { ButtonProps } from './types';

export default function Button({ label, onClick, icon } : ButtonProps) {
  return (
    <div onClick={onClick} >{label} {icon}
    </div>
  )
}

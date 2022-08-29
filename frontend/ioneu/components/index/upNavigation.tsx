import * as React from 'react';
import Image from 'next/image'
import Link from "next/link";

export default function Up() {
    return (
        <div>
            <Link href="/">
                <a>
                <Image 
                src="/images/ci.png" 
                width={150} 
                height={50}/>
              </a>
              </Link>
        </div>
    );  
}
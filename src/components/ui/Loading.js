import React from 'react'

const Loading = () => {
    return (
        <section>
            <div className="loader">
                <span className={{property: "--i:0;"}}></span>
                <span  className={{property: "--i:1;"}}></span>
                <span  className={{property: "--i:2;"}}></span>
                <span  className={{property: "--i:3;"}}></span>
                <span  className={{property: "--i:4;"}}></span>
                <span  className={{property: "--i:5;"}}></span>
                <span  className={{property: "--i:6;"}}></span>
            </div>
        </section>
    )
}

export default Loading

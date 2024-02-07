import React from 'react'
import { useAuth } from '../store/auth'

const Service = () => {

  const { services } = useAuth();

  return (
    <>
      <section className='section-services'>
        <div className='container'>
          <h1 className='main-heading'>Services</h1>
        </div>

        <div className='container grid grid-three-cols'>

          {
            services.map((curelem, index) => {

              const { price, description, provider, service } = curelem;
              return (
                <div className="card" key={index}>
                  {/* map() use karenge to key dena parega */}
                  <div className="card-img">
                    <img src="/images/design.png" alt="our services info" width="500" />
                  </div>

                  <div className="card-details">
                    <div className="grid grid-two-cols">
                      <p>{provider}</p>
                      <p>{price}</p>
                      {/* <p>{curelem.price}</p>- if not destructure */}
                    </div>
                    <h2>{service}</h2>
                    <p>{description}</p>
                  </div>
                </div>
              )
            })
          }

          {/* <div className="card">
            <div className="card-img">
              <img src="/images/design.png" alt="our services info" width="500" />
            </div>

            <div className="card-details">
              <div className="grid grid-two-cols">
                <p>Provider</p>
                <p>price</p>
              </div>
              <h2>service</h2>
              <p>description</p>
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default Service
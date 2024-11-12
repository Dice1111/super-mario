'use client'

import HandleShortlistUI from '@/app/boundaries/BuyerUI/HandleShortlistUI'
import Card from '@/components/Card/Card'
import { UsedCarListing } from '@prisma/client'
import { useEffect, useState } from 'react'

interface ViewUsedCarListingProps {
  loadData: () => Promise<UsedCarListing[]>
}

const CarListing = ({ loadData }: ViewUsedCarListingProps) => {
  const [cars, setCars] = useState<UsedCarListing[] | null>(null)
  const [car_id, setCarID] = useState<string>('')
  const [modal, setModal] = useState<JSX.Element | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const fetchData = async () => {
    const data = await loadData()
    setCars(data)
    setModal(null)
  }

  useEffect(() => {
    fetchData()
  }, [loadData])

  useEffect(() => {
    if (car_id) {
      const boundary = HandleShortlistUI.getInstance()
      const modal = boundary.displayHandleShortlistUI(fetchData, car_id)
      setModal(modal)
    }
  }, [openModal])

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        {cars && cars.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {cars.map((car) => (
              <Card
                key={car.id}
                car={car}
                setCarID={() => setCarID(car.id)}
                setOpenModal={() =>
                  openModal ? setOpenModal(false) : setOpenModal(true)
                }
              />
            ))}
          </div>
        ) : (
          <p>No cars available.</p>
        )}
      </div>
      {modal}
    </>
  )
}

export default CarListing

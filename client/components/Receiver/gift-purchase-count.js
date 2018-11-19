import React from 'react'

const GiftPurchaseCount = ({receiverId, gifts}) => {
  
  const purchasedCount = (receiverId) => {
    return gifts.reduce((acc, gift) => {
      if (gift.purchased && receiverId == gift.receiverId) acc++
      return acc
    }, 0)
  }
  
  return (
    <span>{purchasedCount(receiverId)}</span>
  )
}

export default GiftPurchaseCount

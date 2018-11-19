import React from 'react'

const GiftCount = ({receiverId, gifts}) => {
  
  const receiverGiftCount = (receiverId) => {
    return gifts.reduce((acc, gift) => {
      if (gift.receiverId === receiverId) acc++
      return acc
    }, 0)
  }
  
  return (
    <span>{receiverGiftCount(receiverId)}</span>
  )
}

export default GiftCount

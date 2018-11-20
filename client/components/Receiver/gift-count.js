import React from 'react'
import PropTypes from 'prop-types'

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

GiftCount.propTypes = {
  receiverId: PropTypes.number,
  gifts: PropTypes.arrayOf(PropTypes.object)
}

export default GiftCount

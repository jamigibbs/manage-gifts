import React from 'react'
import PropTypes from 'prop-types'

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

GiftPurchaseCount.propTypes = {
  receiverId: PropTypes.number,
  gifts: PropTypes.arrayOf(PropTypes.object)
}

export default GiftPurchaseCount

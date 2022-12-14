import {useEffect, useState} from 'react'
import {collection, getDocs, query, where, orderBy,limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Offers() {
    const [listings , setListings] = useState(null)
    const [loading , setLoading] = useState(true)
    const [lastFetchedListing,setLastFetchedListing] = useState(null)

    
    useEffect(() => {
        const fetchListings = async () =>{
        try {
            // get collection reference
            const listingRef = collection(db, 'listing')

            // create Query
            const q = query(listingRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10))
            
            // execute query
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length-1]
                setLastFetchedListing(lastVisible)    
            const offers = []

            querySnap.forEach((doc)=>{
               return offers.push({
                id : doc.id,
                data: doc.data()
               })
            })

            setListings(offers)
            setLoading(false)
           
        } 
        catch (error) {
            toast.error('something went wrong')
            
        }
      
      }
       fetchListings()
    }, [])
    // Pagination Load More Function
    const onFetchMoreListings = async () =>{
      try {
          //get reference of where the info is, which collection?
          const listingsRef = collection(db,'listing')

          //create the query
          const q = query(listingsRef,where('offer', '==', true),orderBy('timestamp','desc'),startAfter(lastFetchedListing),limit(10))

          //run the query
          const querySnap = await getDocs(q)
          const lastVisible = querySnap.docs[querySnap.docs.length-1]
          setLastFetchedListing(lastVisible)

          const listings = []
          querySnap.forEach((doc) =>{
              return listings.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          setListings((prevState) => [...prevState, ...listings])
          setLoading(false)
      } catch (error) {
          toast.error('Could not fetch listings')
      }
  }
  return (
    <div className='category'>
        <header className="pageHeader">
          <p className="pageHeader">
            Offers
          </p>
        </header>
        {loading ? <Spinner/> : listings && listings.length > 0 ?(
        <>
        <main>
            <ul className="categoryListings">
                {listings.map((listing)=>{
                  return <ListingItem listing={listing.data} id ={listing.id} key={listing.id}/>
                })}
            </ul>
        </main>
        <br/>
      <br/>
      {lastFetchedListing && (
          <p className="loadMore" onClick={onFetchMoreListings}>Load More ...</p>
      )}
        </>
        ):
         (<p>There are no current offers</p>)
         }
    </div>
  )
}

export default Offers
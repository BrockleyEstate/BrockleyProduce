import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  farmerId: string;
  buyerId: string;
  buyerName: string;
  rating: number;
  comment: string;
  createdAt: any;
}

interface ReviewSectionProps {
  farmerId: string;
}

export function ReviewSection({ farmerId }: ReviewSectionProps) {
  const { user, profile } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('farmerId', '==', farmerId)
        );
        const querySnapshot = await getDocs(q);
        const fetchedReviews: Review[] = [];
        querySnapshot.forEach((doc) => {
          fetchedReviews.push({ id: doc.id, ...doc.data() } as Review);
        });
        // Sort client-side since we didn't create a composite index
        fetchedReviews.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (farmerId) {
      fetchReviews();
    }
  }, [farmerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    
    setIsSubmitting(true);
    try {
      const newReview = {
        farmerId,
        buyerId: user.uid,
        buyerName: profile.displayName || 'Anonymous',
        rating,
        comment,
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, 'reviews'), newReview);
      setReviews([{ id: docRef.id, ...newReview, createdAt: { toMillis: () => Date.now() } } as any, ...reviews]);
      setComment('');
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + (rev.rating || 0), 0) / reviews.length).toFixed(1)
    : 'New';

  return (
    <div className="mt-12 pt-12 border-t border-earth-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-earth-900">Customer Reviews</h3>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="text-lg font-medium text-earth-900">{averageRating}</span>
          <span className="text-earth-500">({reviews.length} reviews)</span>
        </div>
      </div>

      {user && profile?.role === 'consumer' ? (
        <form onSubmit={handleSubmit} className="mb-10 bg-earth-50 p-6 rounded-xl border border-earth-200">
          <h4 className="text-lg font-medium text-earth-900 mb-4">Write a Review</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-earth-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${rating >= star ? 'text-yellow-400 fill-current' : 'text-earth-300'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-earth-700 mb-2">Comment</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
              placeholder="Share your experience with this farmer's produce..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      ) : !user ? (
        <div className="mb-10 bg-earth-50 p-6 rounded-xl border border-earth-200 text-center">
          <p className="text-earth-600 mb-4">Sign in as a shopper to leave a review.</p>
        </div>
      ) : null}

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-earth-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-earth-200 rounded"></div>
              <div className="h-4 bg-earth-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-earth-100 pb-6 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-earth-900">{review.buyerName}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-earth-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-earth-600 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-earth-500 italic">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
// import { likeThread } from '@/lib/actions/thread.actions';


interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  image: string;
  
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  image,
}: Props) {
  /* const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      // Assuming you have a function like `likeThread` in your actions
      await likeThread(id, currentUserId);

      // Update the local state to reflect the new like status
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Error while liking thread:", error);
    }
  };
  */
  return (
   
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "mt-2 bg-dark-7 px-0 xs:p-4" : "bg-dark-7 p-7"
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-gray-4'>
                {author.name}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-gray-4'>{content}</p>

            {image !== "" && (
            <div className='relative h-48 w-full'>
              <Image
                src={image}
                alt='post picture'
                fill
                style={{ objectFit: 'contain',  }}
                className='rounded-xl'
              />
            </div>
          )}
          
            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3 text-dark-2`}>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='like'
                  width={24}
                  height={24}
                  
                  className='cursor-pointer object-contain'
                />
                {/* <Image
                  src={isLiked ? '/assets/heart-red.svg' : '/assets/heart-gray.svg'}
                  alt='like'
                  width={24}
                  height={24}
                  onClick={handleLike}
                  className='cursor-pointer object-contain'
    /> */}

                <Link href={`/thread/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='comment'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='repost'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                {/*
                <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
    */}
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className='ml-1 mt-3 flex items-center gap-2'>
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;

import { useOrganizationList, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OrganizationAuthChecker: React.FC = () => {
  const { user } = useUser();
  const { organizationList, isLoaded } = useOrganizationList();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    setIsLoading(false);

    if (!user) {
      console.log('User not authenticated');
      redirect('/login');
      return;
    }

    const isMemberOfOwners = organizationList.some(({ organization }) => 
      organization.name === 'Owners'
    );

    if (isMemberOfOwners) {
      setIsAuthorized(true);
    } else {
      console.log('User is not authorized');
      redirect('/denied');
    }
  }, [user, isLoaded, organizationList]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <div>Unauthorized...</div>;
  }

  return null; // When authorized, render nothing, allowing the rest of the page to render
};

export default OrganizationAuthChecker;

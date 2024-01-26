import { Detail, List } from "@raycast/api";
import React from "react";
import { useGetPersonalFeedQuery } from "../generated/hooks_and_more";
import { apolloGqlClient } from "../grapqhqlClient";

const FollowedAccountLists = () => {
  const { data: myFollowedAccounts, fetchMore } = useGetPersonalFeedQuery({
    client: apolloGqlClient,
    onCompleted(data) {
      console.log("feedData", data?.me?.follows);
    },
  });
  const myPersonalAccounts = myFollowedAccounts?.me?.follows?.nodes;
  return (
    <>
      <Detail markdown="# Accounts you Follow" />
      <List>{myPersonalAccounts?.map((a) => <List.Item title={a?.name} />)}</List>
    </>
  );
};

export default FollowedAccountLists;

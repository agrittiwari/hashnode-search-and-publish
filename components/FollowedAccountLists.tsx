import { Action, ActionPanel, Detail, List } from "@raycast/api";
import React from "react";
import { useGetAllPostsOfaPublicationQuery, useGetPersonalFeedQuery } from "../generated/hooks_and_more";
import { apolloGqlClient } from "../grapqhqlClient";

type publication = {
  id: string;
  title?: string;
};

const FollowedAccountLists = () => {
  const {
    data: myFollowedAccounts,
    loading,
    fetchMore,
  } = useGetPersonalFeedQuery({
    client: apolloGqlClient,
    onCompleted(data) {
      console.log("feedData", data?.me?.follows);
    },
  });
  const myPersonalAccounts = myFollowedAccounts?.me?.follows?.nodes?.flatMap((a) => a?.publications?.edges);

  return (
    <List isLoading={loading} searchBarPlaceholder="Search from User accounts you follow">
      {myPersonalAccounts?.map((a) => (
        <List.Item
          title={a?.node?.title}
          actions={
            <ActionPanel>
              <Action.Push title="Open" target={<BlogsList id={a?.node?.id} />} />
              <Action.OpenInBrowser url={a?.node?.canonicalURL} />
            </ActionPanel>
          }
        />
      ))}
      {/* <List.Item
        title={"Search more"}
        actions={
          <ActionPanel>
            <Action title="Fetch more" onAction={() => fetchMore({})} />
          </ActionPanel>
        }
      /> */}
    </List>
  );
};

function BlogsList({ id }: publication) {
  const { data: publicationsBlogs, loading } = useGetAllPostsOfaPublicationQuery({
    client: apolloGqlClient,

    variables: {
      publicationId: id,
    },
    skip: !id,
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const blogs = publicationsBlogs?.publication?.posts?.edges;
  return (
    <List isLoading={loading} isShowingDetail={true}>
      {blogs?.map((b) => (
        <List.Item
          title={b?.node?.title}
          subtitle={b?.node?.subtitle}
          detail={<List.Item.Detail isLoading={loading} markdown={`#${b?.node?.slug}`} />}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={id} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
export default FollowedAccountLists;

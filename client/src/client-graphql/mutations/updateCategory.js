export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!, $flexB: Boolean!) {
    updateCategory(id: $id, name: $name, flexB: $flexB) {
      id
      name
      flexB
    }
  }
`;
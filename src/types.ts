export type UserType = {
  id: number;
  username: string;
  email: string;
  balance: number;
  createdAt: string;
};

export type ItemType = {
  id: number;
  title: string;
  description: string;
  price: number;
  sellor: {
    id: number;
    username: string;
  };
};

export type CartType = [
  {
    quantity: number;
    item: ItemType;
  }
];

export type ErrorType = {
  field: string;
  msg: string;
};

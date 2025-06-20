import instance from "@/lib/axios";

export const signup = async (
  email: string,
  password: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const response = await instance.post("/api/auth/signup", {
      email,
      password,
    });
    if (response.status === 201) {
      onSuccess();
    } else {
      onError(response.data.message);
    }
  } catch (error: any) {
    console.error("error: ", error);
    onError(error.response.data.message);
  }
};

// Get user
export const getUser = async (
  onSuccess: (user: any) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get(`/api/user/profile`);
    if (res.status === 200) {
      const { user } = res.data;
      // const newUser: any = {
      //   ...user,
      //   transactions: user.receivedTransactions
      //     .concat(user.sentTransactions)
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     ),
      //   recentDeposit: user.receivedTransactions
      //     ?.filter((transaction: any) => transaction.type === "DEPOSIT")
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     )[0]?.amount,
      //   recentWithdrawal: user.sentTransactions
      //     ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     )[0]?.amount,
      //   recentBonus: user.receivedTransactions
      //     ?.filter((transaction: any) => transaction.type === "BONUS")
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     )[0]?.amount,
      //   recentWithdrawStatus: user.sentTransactions
      //     ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     )[0]?.status,
      // };
      onSuccess(user);
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error getting user:", error);
    onError(error.response.data.message);
  }
};

// Get users by admin
export const getAllUsers = async (
  onSuccess: (users: any) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get(`/api/user/all-user`);
    if (res.status === 200) {
      const { users } = res.data;
      // const newUser: any = {
      //   ...user,
      //   transactions: user.receivedTransactions
      //     .concat(user.sentTransactions)
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     ),
      //   recentDeposit: user.receivedTransactions
      //     ?.filter((transaction: any) => transaction.type === "DEPOSIT")
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     )[0]?.amount,
      //   recentWithdrawal: user.sentTransactions
      //     ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     )[0]?.amount,
      //   recentBonus: user.receivedTransactions
      //     ?.filter((transaction: any) => transaction.type === "BONUS")
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     )[0]?.amount,
      //   recentWithdrawStatus: user.sentTransactions
      //     ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
      //     .sort(
      //       (a: any, b: any) =>
      //         new Date(b.created_at).getTime() -
      //         new Date(a.created_at).getTime()
      //     )[0]?.status,
      // };
      onSuccess(users);
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error getting user:", error);
    onError(error.response.data.message);
  }
};

export const updateProfile = async (
  data: any,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("username", data.username);

    const res = await instance.put("/api/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error updating profile:", error);
    onError(error.response.data.message);
  }
};

export const updatePassword = async (
  data: {
    oldPassword: string;
    newPassword: string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/user/password", data);

    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error updating password:", error);
    onError(error.response.data.message);
  }
};

export const updateKYC = async (
  data: {
    phone_number: string;
    address: string;
    government_id: File | string;
    id_card: File | string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const formData = new FormData();
    formData.append("phone_number", data.phone_number);
    formData.append("address", data.address);
    formData.append("government_id", data.government_id);
    formData.append("id_card", data.id_card);

    const res = await instance.put("/api/user/kyc", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error updating KYC:", error);
    onError(error.response.data.message);
  }
};

export const forgotPassword = async (
  data: {
    email: string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/auth/forgot-password", data);

    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error sending forgot password email:", error);
    onError(error.response.data.message);
  }
};

export const resetPassword = async (
  data: {
    password: string;
    token: string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/auth/reset-password", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error resetting password:", error);
    onError(error.response.data.message);
  }
};

// Deposit
export const deposit = async (
  data: {
    amount: number;
    type: "DEPOSIT";
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/balance", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error depositing:", error);
    onError(error.response.data.message);
  }
};

// Withdraw
export const withdraw = async (
  data: {
    amount: number;
    type: "WITHDRAWAL";
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/balance", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error withdrawing:", error);
    onError(error.response.data.message);
  }
};

// Add bonus
export const addBonus = async (
  data: {
    amount: number;
    type: "BONUS";
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/bonus", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error adding bonus:", error);
    onError(error.response.data.message);
  }
};

// Send bonus
export const sendBonus = async (
  data: {
    amount: number;
    email: string;
    type: "TRANSFER";
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/user/bonus", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error sending bonus:", error);
    onError(error.response.data.message);
  }
};

// Get all transactions
export const getTransactions = async (
  onSuccess: (transactions: any) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get("/api/transactions/get-transaction");

    if (res.status === 200) {
      const transactions: any = res.data.transactions;
      const newTransactions: any = transactions.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      onSuccess(newTransactions);
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error getting all transactions:", error);
    onError(error.response.data.message);
  }
};

// Get all transactions by admin
export const getAllTransactions = async (
  onSuccess: (transactions: any) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get("/api/transactions/all-transaction");

    if (res.status === 200) {
      const transactions: any = res.data.transactions;
      const newTransactions: any = transactions.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      onSuccess(newTransactions);
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error getting all transactions:", error);
    onError(error.response.data.message);
  }
};

// Send support
export const sendSupport = async (
  data: {
    subject: string;
    message: string;
  },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post("/api/support/create", data);
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error sending support:", error);
    onError(error.response.data.message);
  }
};

// Get support
export const getSupports = async (
  onSuccess: (supports: any) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get("/api/support/get-supports");
    if (res.status === 200) {
      const supports: any = res.data.supports;
      const newSupports: any = supports.sort(
        (a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      onSuccess(newSupports);
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error getting support:", error);
    onError(error.response.data.message);
  }
};

// Delete support
export const deleteSupport = async (
  id: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.delete(`/api/support/delete`, {
      data: {
        id,
      },
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error deleting support:", error);
    onError(error.response.data.message);
  }
};

// Update user status by admin
export const updateUserStatus = async (
  email: string,
  status: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/user/status", {
      email,
      status,
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error updating user status:", error);
    onError(error.response.data.message);
  }
};

// Approve withdrawal request
export const approveWithdrawal = async (
  id: string,
  email: string,
  amount: number,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/transactions/approve-withdrawal", {
      id,
      email,
      amount,
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error approving withdrawal:", error);
    onError(error.response.data.message);
  }
};

// Approve KYC by admin
export const handleKYC = async (
  email: string,
  type: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/user/handle-kyc", {
      email,
      type,
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error approving KYC:", error);
    onError(error.response.data.message);
  }
};

// Get all supports by admin
export const getAllSupports = async (
  onSuccess: (supports: any) => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.get("/api/support/get-all-support");
    if (res.status === 200) {
      const supports: any = res.data.supports;
      const newSupports: any = supports.sort(
        (a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      onSuccess(newSupports);
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error getting all supports:", error);
    onError(error.response.data.message);
  }
};

// Update support by admin
export const updateSupport = async (
  id: string,
  message: string,
  reply: string,
  status: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.put("/api/support/update", {
      id,
      message,
      reply,
      status,
    });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error updating support:", error);
    onError(error.response.data.message);
  }
};

// Verify email
export const verifyEmail = async (
  token: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const res = await instance.post(`/api/auth/verify-email`, { token });
    if (res.status === 201) {
      onSuccess();
    } else {
      onError(res.data.message);
    }
  } catch (error: any) {
    console.error("Error verifying email:", error);
    onError(error.response.data.message);
  }
};

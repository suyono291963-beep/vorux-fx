const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    let role = "client";

    try {
      const docRef = doc(db, "users", userCredential.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        role = docSnap.data().role;
      }
    } catch (firestoreError) {
      console.log("Firestore gagal, tapi login tetap lanjut");
    }

    if (role === "admin" || userCredential.user.email === "antonsevenn@gmail.com") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err: any) {
    setError(err.message || "Login gagal.");
  } finally {
    setLoading(false);
  }
};

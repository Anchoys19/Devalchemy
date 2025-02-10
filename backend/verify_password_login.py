from passlib.hash import argon2

# Example passwords to hash

# Generate Argon2 hashes for each password
hashed_passwords = [argon2.hash(password) for password in passwords]

# Print hashed passwords for use in your SQL script
for i, hashed_password in enumerate(hashed_passwords, start=1):
    print(f"User {i}: {hashed_password}")


def validate_password(stored_hash, provided_password):
    return argon2.verify(provided_password, stored_hash)


stored_hash = r"$argon2id$v=19$m=65536,t=3,p=4$W+sd45xzbo2R8l7r/f9/7w$U9qYbLuoURTb/wyzytN9mBP82MEjlhCgFKvJGr6iI6w"
provided_password = "securepass456"

if validate_password(stored_hash, provided_password):
    print("Password is valid!")
else:
    print("Invalid password!")

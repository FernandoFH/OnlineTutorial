import hashlib 

h = hashlib.new("SHA256")
correct_password = "MyPassword123"
h.update(correct_password.encode())

password_hash = h.hexdigest()
print(password_hash)

user_input = "MyPassword123"
h = hashlib.new("SHA256")
h.update(user_input.encode())
input_hash = h.hexdigest()

# print(hashlib.algorithms_guaranteed) 

print(input_hash == password_hash)

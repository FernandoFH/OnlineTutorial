import re

# Ruta del archivo
file_path = 'Demos_sipresId.txt'

# Lista para almacenar los valores de SipreId
sipreid_list = []

# Expresión regular para encontrar los valores de SipreId
sipreid_pattern = re.compile(r'\b\d{6,}_\d\b')

# Leer el archivo
with open(file_path, 'r') as file:
    lines = file.readlines()
    for line in lines:
        match = sipreid_pattern.search(line)
        if match:
            sipreid_list.append(match.group())

# Convertir la lista a una cadena separada por comas
sipreid_str = ','.join(sipreid_list)
print(sipreid_str)
---
title: Buchstaben & QR-Codes
---

> [!success] Lernziele
> 
> - Sie können mit der ASCII-Tabelle eine **Nachricht binär in einem QR-Code speichern**.
> - Sie wissen, welche **drei Schritte** anschliessend noch nötig wären, damit der QR-Code komplett und scanbar ist.
> - Sie kennen den **Namen des Error-Correction-Codes**, der bei QR-Codes angewandt wird.
> - Sie können den **Einfluss des Error-Correction-Levels** auf die Menge der Daten, die abgespeichert werden können, erklären. (Sie müssen die EC-Levels nicht auswendig können!)

## Buchstaben binär speichern

Es wird Sie kaum überraschen, dass Texte in Computern letztlich eine Serie von Binärzahlen sind. Die Kodierung ist letztlich einfach eine Tabelle, **die jeder Zahl einen Buchstaben zuordnet**. 

Heute verwenden wir dafür weiterhin die sogenannte ASCII-Tabelle, die in den 1960ern standardisiert wurde. Dieser Zeichensatz wurde für die Übertragung so klein wie möglich gehalten, nämlich 7 Bit oder 128 Zeichen.

![[ascii-table.excalidraw]]

Beispiel:
- `A` hat den ASCII-Code 65.
- `a` hat den ASCII-Code 97.

ASCII deckt hauptsächlich die englische Sprache ab und hat somit Einschränkungen für andere Sprachen und Symbole (z.B. `€ — © ™ ∆ Ω 你好 Привіт 😊 🎉`)

Als Reaktion auf die Beschränkungen von ASCII wurde Unicode entwickelt, um alle Schriftzeichen aller Sprachen darzustellen. Unicode kann über 1 Million Zeichen kodieren, von denen bisher über 143'000 definiert sind. 

> [!NOTE]- Zusatz: Binäre Kodierung von Unicode
> 
> Binär nutzt Unicode den Umstand, dass die ASCII-Tabelle nur 7 Bit benötigt, also dass ein "normales" ASCII-Byte mit 0 beginnen würde. Unicode sagt nun: Wir signalisieren mit **`1` am Anfang des ersten Byte**, wie viele Bytes wir nutzen, und mit `10` am Anfang der weiteren Bytes, dass sie teil des gleichen Symbols sind.
> 
> - **1 Byte** (für Zeichen von U+0000 bis U+007F):
>     - Format: `0xxxxxxx`
>     - Beispiel: `A` (U+0041) -> `01000001`
> - **2 Bytes** (für Zeichen von U+0080 bis U+07FF):
>     - Format: `110xxxxx 10xxxxxx`
>     - Beispiel: `é` (U+00E9) -> `11000011 10101001`
> - **3 Bytes** (für Zeichen von U+0800 bis U+FFFF):
>     - Format: `1110xxxx 10xxxxxx 10xxxxxx`
>     - Beispiel: `你` (U+4F60) -> `11100100 10111101 10100000`
> - **4 Bytes** (für Zeichen von U+10000 bis U+10FFFF):
>     - Format: `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx`
>     - Beispiel: `𐍈` (U+10348) -> `11110000 10010000 10001101 10001000`

## QR-Codes

### Erklärvideo

![[qrcode_full.mp4]]

### Schritt für Schritt

Nun zeichnen Sie den Beginn Ihres eigenen QR-Codes. Wir haben im Video gesehen: Wir können binäre Bytes in einen QR-Code schreiben. Standardmässig werden **Binärdaten von Lesern als ASCII-Charaktere interpretiert**. 

> [!NOTE]- Bilder und Audio auf QR-Codes speichern? Und wieso verwenden wir nicht "alphanumerisch"?
> 
> Ja, Sie könnten theoretisch Binärdaten jedweder Art speichern - also auch Bilder, Audio oder ganze Programme. Das Problem: Woher soll der Leser wissen, um was für Daten es sich handelt? QR-Codes speichern sehr wenig Meta-Daten - das sind "Daten über Daten", wie z. B. die Kodierung oder den Dateityp. Wir haben bloss auf den ersten vier Bits die Möglichkeit zu sagen, dass es sich um Binärdaten handelt. Aber darüber hinaus gibt es keine festgelegte Struktur.
> 
> Das bedeutet, dass der Empfänger entweder vorher wissen muss, was für eine Art von Datei sich im QR-Code befindet, oder man muss eine eigene Konvention festlegen, z. B. indem man am Anfang der Daten eine kleine Kennung speichert (etwa `"PNG"` für ein Bild oder `"MP3"` für eine Audiodatei). In der Praxis werden daher oft **URLs** verwendet, die auf eine Datei im Internet verweisen - so kann der Browser oder das Betriebssystem automatisch das richtige Programm zum Öffnen wählen.
> 
> Im Übrigen wählen wir Binärdaten, damit Sie die ASCII-Tabelle verwenden können, die überall in der Informatik vorkommt. Alphanumerische QR-Codes könnten Buchstaben, Zahlen und einige wenige Symbole kompakter speichern, aber dann müssten Sie eine spezielle Kodierung verwenden, die Ihnen anderweitig wenig bringt.

1) Beginnen Sie, den QR-Code von unten rechts aufzufüllen. Am Anfang kommen **12 Bits Metadaten** - also "Daten über Daten".
2) Die ersten vier Bits definieren **welche von Daten im QR-Code stecken**. Es gibt vier Optionen:
	- 0001 für numerische Daten
	- 0010 für alphanumerische Daten
	- 0100 für Binärdaten 
	- 1000 für japanisches Kanji
	Wir wählen Binärdaten, damit wir die ASCII-Tabelle nutzen können.
3) Wählen Sie eine Nachricht aus, die Sie auf Ihrem QR-Codes kodieren wollen. Als Beispiel nehmen ich hier den String: "www.informatikgarten.ch"
4) Zählen Sie die Anzahl Charaktere in der Nachricht. Da es sich um normale ASCII-Charakter handelt, ist jeder Charakter ein Byte lang. Im Beispiel also 23<sub>10</sub>, was 0001'0111<sub>2</sub> entspricht.
5) Füllen Sie die **Anzahl Charaketere als ein ganzes Byte** ab, wie im Bild gezeigt. Hängen Sie also vorne an Ihre Binärzahl Nullen an, bis Sie acht Stellen haben.
6) Ab diesem Punkt füllen Sie jeden Charakter als ein volles Byte auf den QR-Code ab.

![[04-qrcode-bytegrenzen.excalidraw.light.svg]]

### Ein Turtle-Programm, das QR-Code-Bilder erstellt

Folgendes Turtle-Programm können Sie gebrauchen, um Ihren QR-Code zu überprüfen. Ändern Sie dazu die **Inputwerte auf den Zeilen 500 bis 510** ab.

```turtle
import turtle
import math


class GaloisField:
    """Helper class for Reed-Solomon error correction calculations"""
    
    def __init__(self, prime_poly=0x11D, field_size=256):
        self.prime_poly = prime_poly
        self.field_size = field_size
        self.exp = [0] * (field_size * 2)
        self.log = [0] * field_size
        
        # Initialize tables
        x = 1
        for i in range(field_size - 1):
            self.exp[i] = x
            self.log[x] = i
            x = self._multiply_noLUT(x, 2)
        
        # Extend the exponent table for easy calculations
        for i in range(field_size - 1, field_size * 2 - 2):
            self.exp[i] = self.exp[i - (field_size - 1)]
    
    def _multiply_noLUT(self, x, y):
        """Multiply two numbers in the Galois Field without lookup tables"""
        p = 0
        while y:
            if y & 1:
                p ^= x
            y >>= 1
            x <<= 1
            if x & self.field_size:
                x ^= self.prime_poly
        return p
    
    def multiply(self, x, y):
        """Multiply two numbers in the Galois Field using lookup tables"""
        if x == 0 or y == 0:
            return 0
        return self.exp[(self.log[x] + self.log[y]) % (self.field_size - 1)]
    
    def divide(self, x, y):
        """Divide x by y in the Galois Field"""
        if y == 0:
            raise ZeroDivisionError("Division by zero in Galois Field")
        if x == 0:
            return 0
        return self.exp[(self.log[x] + self.field_size - 1 - self.log[y]) % (self.field_size - 1)]




class QRCode:
    def __init__(self, data, error_correction="M", mask=None, enable_ec=True):
        """Initialize QR code with data, error correction level, and optional mask (0-7)"""
        self.data = data
        self.error_correction = error_correction
        self.mask = mask  # None means no mask
        self.size = 25  # Version 2 QR code is 25x25 modules
        self.matrix = [[0 for _ in range(self.size)] for _ in range(self.size)]
        self.ec_codewords = {"L": 10, "M": 16, "Q": 22, "H": 28}
        self.data_capacity = {"L": 34, "M": 28, "Q": 22, "H": 16}
        self.gf = GaloisField()  # Initialize Galois Field for Reed-Solomon
        self.enable_ec = enable_ec  # Enable or disable error correction

    def generate(self):
        """Generate QR code matrix"""
        # 1. Add finder patterns
        self._add_finder_patterns()

        # 2. Add alignment pattern
        self._add_alignment_pattern()

        # 3. Add timing patterns
        self._add_timing_patterns()

        # 4. Add format information area (reserved)
        self._add_format_info()

        # 5. Encode data
        data_bits = self._encode_data()

        print(f"Data bits: {data_bits}")

        # 6. Place data bits in matrix
        self._place_data(data_bits)

        # 7. Apply masking if specified
        if self.mask is not None:
            self._apply_mask(self.mask)

        # 8. Add format information
        self._add_real_format_info()

        return self.matrix

    def _add_finder_patterns(self):
        """Add the three finder patterns to the QR code matrix"""
        # Pattern for each finder pattern (7x7)
        pattern = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ]

        # Top-left finder pattern
        for i in range(7):
            for j in range(7):
                self.matrix[i][j] = pattern[i][j]

        # Top-right finder pattern
        for i in range(7):
            for j in range(self.size - 7, self.size):
                self.matrix[i][j] = pattern[i][j - (self.size - 7)]

        # Bottom-left finder pattern
        for i in range(self.size - 7, self.size):
            for j in range(7):
                self.matrix[i][j] = pattern[i - (self.size - 7)][j]

        # Add separator (white border)
        for i in range(8):
            # Top-left separators
            self.matrix[i][7] = 0
            self.matrix[7][i] = 0

            # Top-right separators
            self.matrix[i][self.size - 8] = 0

            # Bottom-left separators
            if i > 0:  # Avoid overwriting top-left
                self.matrix[self.size - i][7] = 0
                self.matrix[self.size - 8][i] = 0

    def _add_alignment_pattern(self):
        """Add alignment pattern for version 2 QR code"""
        # Position for version 2 is at (18, 18)
        pattern = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1],
        ]

        row, col = 16, 16  # Alignment pattern position for version 2

        for i in range(5):
            for j in range(5):
                self.matrix[row + i][col + j] = pattern[i][j]

    def _add_timing_patterns(self):
        """Add horizontal and vertical timing patterns"""
        # Horizontal timing pattern
        for i in range(8, self.size - 8):
            self.matrix[6][i] = 1 if i % 2 == 0 else 0

        # Vertical timing pattern
        for i in range(8, self.size - 8):
            self.matrix[i][6] = 1 if i % 2 == 0 else 0

    def _add_format_info(self):
        """Reserve space for format information"""
        # Around top-left finder pattern
        for i in range(9):
            if i != 6:  # Skip timing pattern
                self.matrix[i][8] = -1

        for i in range(8):
            if i != 6:  # Skip timing pattern
                self.matrix[8][i] = -1

        # Around top-right finder pattern and bottom-left finder pattern
        for i in range(8):
            self.matrix[8][self.size - i - 1] = -1
            self.matrix[self.size - i - 1][8] = -1

        # Dark module
        self.matrix[self.size - 8][8] = 1

    def _reed_solomon_encode(self, data_codewords, ec_count):
        """Generate Reed-Solomon error correction codewords"""
        # Generator polynomials for different error correction levels
        # Maps number of error correction codewords to generator polynomial coefficients
        generator_polynomials = {
            7: [1, 127, 122, 154, 164, 11, 68, 117],
            10: [1, 216, 194, 159, 111, 199, 94, 95, 113, 157, 193],
            13: [1, 137, 73, 227, 17, 177, 17, 52, 13, 46, 43, 83, 132, 120],
            15: [1, 29, 196, 111, 163, 112, 74, 10, 105, 103, 104, 101, 108, 200, 107, 96],
            16: [1, 59, 13, 104, 189, 68, 209, 30, 8, 163, 65, 41, 229, 98, 50, 36, 59],
            17: [1, 119, 66, 83, 120, 119, 22, 197, 83, 249, 41, 143, 134, 85, 53, 125, 99, 79],
            18: [1, 239, 251, 183, 113, 149, 175, 199, 215, 240, 220, 73, 82, 173, 75, 32, 67, 217, 146],
            20: [1, 152, 185, 240, 5, 111, 99, 6, 220, 112, 150, 69, 36, 187, 22, 228, 198, 121, 121, 165, 174],
            22: [1, 89, 179, 131, 176, 182, 244, 19, 189, 69, 40, 28, 137, 29, 123, 67, 253, 86, 218, 230, 26, 145, 245],
            24: [1, 122, 118, 169, 70, 178, 237, 216, 102, 115, 150, 229, 73, 130, 72, 61, 43, 206, 1, 237, 247, 127, 217, 144, 117],
            26: [1, 246, 51, 183, 4, 136, 98, 199, 152, 77, 56, 206, 24, 145, 40, 209, 117, 233, 42, 135, 68, 70, 144, 146, 77, 43, 94],
            28: [1, 252, 9, 28, 13, 18, 251, 208, 150, 103, 174, 100, 41, 167, 12, 247, 56, 117, 119, 233, 127, 181, 100, 121, 147, 176, 74, 58, 197],
            30: [1, 212, 246, 77, 73, 195, 192, 75, 98, 5, 70, 103, 177, 22, 217, 138, 51, 181, 246, 72, 25, 18, 46, 228, 74, 216, 195, 11, 106, 130, 150]
        }

        # Get the generator polynomial for the specified number of EC codewords
        generator = generator_polynomials.get(ec_count)
        if not generator:
            raise ValueError(f"No generator polynomial available for {ec_count} error correction codewords")

        # Initialize the message polynomial
        message_polynomial = data_codewords + [0] * ec_count
        
        # Perform polynomial division
        for i in range(len(data_codewords)):
            if message_polynomial[i] != 0:
                lead_term = self.gf.log[message_polynomial[i]]
                for j in range(len(generator)):
                    if generator[j] != 0:
                        message_polynomial[i + j] ^= self.gf.exp[(self.gf.log[generator[j]] + lead_term) % 255]

        # Return only the error correction part
        return message_polynomial[len(data_codewords):]

    def _encode_data(self):
        """Encode data in byte mode and add Reed-Solomon error correction"""
        # Convert string to bytes
        data_bytes = self.data.encode("ascii")
        data_length = len(data_bytes)

        # Check if data fits
        if data_length > self.data_capacity[self.error_correction]:
            raise ValueError(
                f"Data too long for version 2 QR code with {self.error_correction} error correction"
            )

        # 1. Create the data codewords
        
        # Start with byte mode indicator (0100) and length
        bit_stream = "0100"  # Mode indicator for byte mode
        
        # For version 2, length is 8 bits
        bit_stream += format(data_length, "08b")
        
        # Add data bytes
        for byte in data_bytes:
            bit_stream += format(byte, "08b")
            
        # Calculate required data bits for this version and EC level
        data_codeword_count = self.data_capacity[self.error_correction] - self.ec_codewords[self.error_correction]
        data_bits_needed = 8 * data_codeword_count
        
        # Add terminator if needed (up to 4 bits)
        terminator_length = min(4, data_bits_needed - len(bit_stream))
        bit_stream += "0" * terminator_length
        
        # Pad to byte boundary
        while len(bit_stream) % 8 != 0:
            bit_stream += "0"
            
        # Add pad bytes until required data length
        pad_bytes = ["11101100", "00010001"]  # Alternating padding bytes
        pad_index = 0
        
        while len(bit_stream) < data_bits_needed:
            bit_stream += pad_bytes[pad_index]
            pad_index = (pad_index + 1) % 2
            
        # Convert bit stream to codewords (bytes)
        data_codewords = []
        for i in range(0, len(bit_stream), 8):
            byte_str = bit_stream[i:i+8]
            data_codewords.append(int(byte_str, 2))
            
        print(f"Data codewords: {data_codewords}")
        
        # 2. Generate error correction codewords using Reed-Solomon or zeros
        ec_count = self.ec_codewords[self.error_correction]
        
        # Initialize ec_codewords before conditional block
        if self.enable_ec:
            # Use Reed-Solomon error correction
            ec_codewords = self._reed_solomon_encode(data_codewords, ec_count)
            print(f"EC codewords: {ec_codewords} (Reed-Solomon)")
        else:
            # Use zeros for error correction bits (educational purpose only)
            ec_codewords = [0] * ec_count
            print(f"EC codewords: {ec_codewords} (Zeros - EC disabled)")
        
        # 3. Combine data and EC codewords into final bit stream
        final_bit_stream = ""
        for codeword in data_codewords:
            final_bit_stream += format(codeword, "08b")
        for codeword in ec_codewords:
            final_bit_stream += format(codeword, "08b")
            
        return final_bit_stream

    def _is_reserved(self, row, col):
        # Skip function patterns:
        # - Finder patterns and their separators (top-left, top-right, bottom-left)
        # - Timing patterns (row 6, col 6)
        # - Alignment pattern (around position 16,16 for version 2)
        # - Format information (-1 values)
        is_reserved = False

        # Check if in finder pattern areas
        if (
            (row < 9 and col < 9)
            or (row < 9 and col >= self.size - 8)
            or (row >= self.size - 8 and col < 9)
        ):
            is_reserved = True

        # Check if in timing pattern
        if row == 6 or col == 6:
            is_reserved = True

        # Check if in alignment pattern area (version 2, position around 16,16)
        if 16 <= row <= 20 and 16 <= col <= 20:
            is_reserved = True

        # Check if it's a format information cell (marked with -1)
        if self.matrix[row][col] == -1:
            is_reserved = True

        return is_reserved

    def _place_data(self, data_bits):
        """Place data bits in the matrix following the zigzag pattern"""
        bit_index = 0
        bits = [int(bit) for bit in data_bits]
        length = len(bits)

        # QR codes place data starting from bottom-right, moving upward in zigzag pattern
        # We need to work in vertical pairs of columns, right to left

        # Whether we're currently moving up or down in this column pair
        going_up = True

        for col_pair in range(self.size - 1, 0, -2):
            # Each iteration handles 2 columns
            right = col_pair
            left = col_pair - 1

            # 25 / 24

            # Process all rows in this column pair
            for row in range(self.size):

                # Get actual row based on direction
                actual_row = self.size - 1 - row if going_up else row
                for c in [right, left]:
                    # Skip if out of bounds
                    if c < 0 or c >= self.size:
                        continue

                    is_reserved = self._is_reserved(actual_row, c)

                    # Only place data in unreserved cells
                    if not is_reserved and bit_index < length:
                        self.matrix[actual_row][c] = bits[bit_index]
                        bit_index += 1

            # Change direction when we move to the next row
            going_up = not going_up

    def _apply_mask(self, mask_number):
        """Apply the specified mask pattern to the data bits"""
        mask_functions = [
            lambda row, col: (row + col) % 2 == 0,  # 000
            lambda row, col: row % 2 == 0,  # 001
            lambda row, col: col % 3 == 0,  # 010
            lambda row, col: (row + col) % 3 == 0,  # 011
            lambda row, col: ((row // 2) + (col // 3)) % 2 == 0,  # 100
            lambda row, col: (row * col) % 2 + (row * col) % 3 == 0,  # 101
            lambda row, col: ((row * col) % 2 + (row * col) % 3) % 2 == 0,  # 110
            lambda row, col: ((row + col) % 2 + (row * col) % 3) % 2 == 0,  # 111
        ]

        mask_function = mask_functions[mask_number]

        for row in range(self.size):
            for col in range(self.size):
                # Only mask data cells (not function patterns)
                if not self._is_reserved(row, col):
                    if mask_function(row, col):
                        # Flip the bit
                        self.matrix[row][col] ^= 1

    def _add_real_format_info(self):
        """Add real format information bits"""
        # Format info consists of error correction level and mask pattern
        # For simplicity, we'll use predefined format information patterns
        format_info = {
            # (error_correction, mask): format_bits
            ("L", 0): "111011111000100",
            ("L", 1): "111001011110011",
            ("L", 2): "111110110101010",
            ("L", 3): "111100010011101",
            ("L", 4): "110011000101111",
            ("L", 5): "110001100011000",
            ("L", 6): "110110001000001",
            ("L", 7): "110100101110110",
            ("M", 0): "101010000010010",
            ("M", 1): "101000100100101",
            ("M", 2): "101111001111100",
            ("M", 3): "101101101001011",
            ("M", 4): "100010111111001",
            ("M", 5): "100000011001110",
            ("M", 6): "100111110010111",
            ("M", 7): "100101010100000",
            ("Q", 0): "011010101011111",
            ("Q", 1): "011000001101000",
            ("Q", 2): "011111100110001",
            ("Q", 3): "011101000000110",
            ("Q", 4): "010010010110100",
            ("Q", 5): "010000110000011",
            ("Q", 6): "010111011011010",
            ("Q", 7): "010101111101101",
            ("H", 0): "001011010001001",
            ("H", 1): "001001110111110",
            ("H", 2): "001110011100111",
            ("H", 3): "001100111010000",
            ("H", 4): "000011101100010",
            ("H", 5): "000001001010101",
            ("H", 6): "000110100001100",
            ("H", 7): "000100000111011",
        }

        # If no mask is specified, use mask 2 (from Veritasium video)
        mask_to_use = self.mask if self.mask is not None else 2

        # Get format bits
        format_bits = format_info.get(
            (self.error_correction, mask_to_use), format_info[("M", 2)]
        )
        format_bits = [int(bit) for bit in format_bits]
        print(f"Format bits: {format_bits}")

        # Place format bits
        # Around top-left finder pattern
        index = 0
        for i in range(6):
            self.matrix[8][i] = format_bits[index]
            print(f"Placing {format_bits[index]} at (8, {i})")
            index += 1

        self.matrix[8][7] = format_bits[index]
        index += 1
        self.matrix[8][8] = format_bits[index]
        index += 1
        self.matrix[7][8] = format_bits[index]
        index += 1

        for i in range(6):
            self.matrix[5 - i][8] = format_bits[index]
            index += 1

        # Around bottom-left and top-right finder patterns
        index = 0
        for i in range(7):
            self.matrix[self.size - 1 - i][8] = format_bits[index]
            index += 1
        for i in range(8):
            self.matrix[8][self.size - 8 + i] = format_bits[index]
            index += 1

def draw_qr_code(qr_matrix, square_size=20):
    """Draw QR code using turtle graphics"""
    screen = turtle.Screen()
    screen.title("QR Code Generator")
    screen.setup(len(qr_matrix) * square_size + 100, len(qr_matrix) * square_size + 100)
    screen.bgcolor("white")

    # Create turtle
    qr_turtle = turtle.Turtle()
    qr_turtle.hideturtle()
    qr_turtle.speed(0)
    qr_turtle.penup()

    # Create a square stamp
    qr_turtle.color("black")
    qr_turtle.shape("square")

    # Calculate starting position (top-left)
    start_x = -(len(qr_matrix) * square_size) / 2
    start_y = (len(qr_matrix) * square_size) / 2

    # Draw QR code
    for row in range(len(qr_matrix)):
        for col in range(len(qr_matrix[row])):
            qr_turtle.goto(
                start_x + col * square_size + square_size / 2,
                start_y - row * square_size - square_size / 2,
            )

            if qr_matrix[row][col] == 1:
                qr_turtle.stamp()

    screen.mainloop()


def main():
    # Get user input
    data = "www.informatikgarten.ch"  # input("Enter data for QR code: ")
    ec_level = "M"  # input("Enter error correction level (L, M, Q, H) [default: M]: ").upper() or 'M'
    enable_ec = False  # Change to False to disable error correction
    mask_input = ""  # input("Enter mask pattern (0-7), or leave blank for no mask: ")

    # Validate error correction level
    if ec_level not in ["L", "M", "Q", "H"]:
        print("Invalid error correction level. Using M.")
        ec_level = "M"

    
    # Show warning if error correction is disabled
    if not enable_ec:
        print("\n⚠️ WARNING: Error correction is disabled!")

    mask = None
    if mask_input.strip():
        try:
            mask = int(mask_input)
            if mask < 0 or mask > 7:
                print("Invalid mask pattern. Using no mask.")
                mask = None
        except ValueError:
            print("Invalid mask pattern. Using no mask.")

    # Generate and draw QR code
    qr = QRCode(data, ec_level, mask, enable_ec)
    matrix = qr.generate()
    draw_qr_code(matrix)


if __name__ == "__main__":
    main()
```

### Drei finale Schritte

Mit dem Abfüllen der Daten ist Ihr QR-Code noch nicht fertig. Es fehlen noch drei Schritte:
- Es werden aus Ihren Daten noch **Fehlerbehebungsdaten** berechnet und hinzugefügt - ähnlich der Prüfziffer beim Barcode, aber besser!
- Dann werden viele Bits gemäss einer von acht möglichen **Masken** invertiert, um den QR-Code so gut scanbar zu machen wie möglich.
- Welches Fehlerbehebungsniveau und welche Maske gewählt wurde, wird in den (bei uns orangen) **Formatstrips** gespeichert.

![[04-qrcode-stepsafterdata.excalidraw]]

Wir schauen uns die Fehlerbehebung noch genauer an.
### Error Correction im QR-Code

QR-Codes sind erstaunlich robust - selbst wenn ein Teil des Codes beschädigt oder unleserlich ist, kann er oft noch korrekt gelesen werden. Die Fehlerkorrektur in QR-Codes basiert auf dem **Reed-Solomon-Code**, einer mathematischen Technik aus der Informationstheorie. Im Prinzip löst der Reed-Solomon-Code das gleiche Problem wie die Prüfziffer bei EAN-13-Barcodes: Wir speichern nicht nur die eigentlichen Daten, sondern auch zusätzliche Prüfwerte, die helfen, **Fehler zu erkennen**. Aber der Reed-Solomon-Code kann Fehler nicht nur erkennen, sondern sogar auch noch **korrigieren**! 

Der Reed-Solomon-Code wird zum Beispiel verwendet um: bei CDs, DVDs und Bluerays Kratzer auszugleichen, oder um die gesendeten Daten der Voyager-Raumsonden abzusichern - die am weitesten von der Erde entfernten Objekte, die je von Menschen gebaut wurden.

![[04-qrcode-voyager.png]]

Wie viele Fehler erkannt und korrigiert werden können, hängt davon ab, wie viel Platz für die Fehlerkorrekturdaten eingeplant wird. QR-Codes haben deshalb verschiedene **Fehlerkorrekturstufen**, die mehr oder weniger Platz gebrauchen und entsprechend weniger oder mehr Daten speichern können:

- Level L (**Low**) kann nur bis zu **7%** der Daten wiederherstellen, dafür aber 34 Bytes speichern.
- Level M (**Medium**) kann bis zu **15%** der Daten wiederherstellen und 28 Bytes speichern.
- Level Q (**Quartile**) kann bis zu **25%** der Daten wiederherstellen und 22 Bytes speichern.
- Level H (**High**) kann zwar bis zu **30%** der Daten wiederherstellen, dafür aber nur 16 Bytes speichern.

*(Als Kontext: Wir reden hier immer von unserem QR-Code der Version 2 mit 25x25 Feldern. Mit grösseren QR-Codes können Sie natürlich viel mehr speichern!)*

Die mathematischen Grundlagen von Reed-Solomon würden den Rahmen dieses Fachs sprengen, da sie recht recht anspruchsvoll sind und auf Polynomdivision in endlichen Körpern basieren. Wichtig zu verstehen ist aber, dass diese Methode QR-Codes sehr widerstandsfähig macht. Selbst wenn ein Stück fehlt oder durch einen Fleck verdeckt ist, kann der Code oft noch vollständig rekonstruiert werden. Eine sehr wertvolle Eigenschaft für den praktischen Einsatz - den Firmen dafür nutzen, Ihre Logos mitten auf den QR-Code zu pflanzen.

"...und er scannt doch!"

![[02-qrcode-ig-ecdemo.excalidraw]]
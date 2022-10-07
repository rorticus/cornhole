export function gen_crc16(data: number) {
  let out = 0;
  let bits_read = 0,
    bit_flag;

  while (bits_read < 16) {
    bit_flag = out >> 15;

    /* Get next bit: */
    out <<= 1;
    out |= (data >> bits_read) & 1; // item a) work from the least significant bits

    /* Increment bit counter: */
    bits_read++;

    /* Cycle check: */
    if (bit_flag) {
      out ^= parseInt(import.meta.env.VITE_SERVER_CRC);
    }
  }

  // item c) reverse the bits
  let crc = 0;
  let i = 0x8000;
  let j = 0x0001;
  for (; i != 0; i >>= 1, j <<= 1) {
    if (i & out) crc |= j;
  }

  return crc;
}

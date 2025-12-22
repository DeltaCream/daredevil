1. You can access the row data using row.original in the cell function. Use this to handle actions for your row eg. use the id to make a DELETE call to your API.

How I coded the AudioCards:

1. page-wide state: which audio is playing, as well as if single-audio mode is open (use Set-Map (set for ids of audio, and map for others (volume and isPlaying)))
2. card-specific state: whether the audio of that card is playing, and the volume

IMPORTANT NOTES!

1)
  insert date to mysql - creating dayjs object then formatting it by "YYYY-MM-DD hh:mm:ss"
  get date from mysql - it is without offset (GMT) - parse it to dayjs object - it will auto offset it. 
  then you can get the right hours by - dayjs().get('hour')

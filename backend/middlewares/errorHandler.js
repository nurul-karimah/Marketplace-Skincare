
export function notFoundHandler(req, res, next){
  res.status(404).json({ error: "Endpoint not found"});
}

export function errorHandler(err, req, res, next){
  console.error(err.stack);
  res.status(500).json({
    error:err.message || "Internal server error"
  })
}
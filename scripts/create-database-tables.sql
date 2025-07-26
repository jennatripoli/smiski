-- Create the user_smiskis table
CREATE TABLE IF NOT EXISTS user_smiskis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  series TEXT NOT NULL,
  is_secret BOOLEAN DEFAULT FALSE,
  count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a user can't have duplicate entries for the same Smiski
  UNIQUE(user_id, name, series)
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_smiskis_user_id ON user_smiskis(user_id);

-- Enable Row Level Security
ALTER TABLE user_smiskis ENABLE ROW LEVEL SECURITY;

-- Create policies so users can only see their own data
CREATE POLICY "Users can view their own smiskis" ON user_smiskis
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own smiskis" ON user_smiskis
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own smiskis" ON user_smiskis
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own smiskis" ON user_smiskis
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_user_smiskis_updated_at 
  BEFORE UPDATE ON user_smiskis 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

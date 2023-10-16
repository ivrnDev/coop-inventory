const UpdateImageModal = () => {
  return (
    <>
      <form>
        <div className="flex flex-col space-y-1.5">
          <Controller
            name="display_image"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <>
                <Label htmlFor="display_image">Image</Label>
                <Input
                  {...field}
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0];
                    if (selectedFile) {
                      onChange(selectedFile);
                      setSelectedImage(selectedFile);
                    }
                  }}
                  type="file"
                  id="display_image"
                />
              </>
            )}
          />
        </div>
      </form>
    </>
  );
};

export default UpdateImageModal;
